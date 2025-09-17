from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import os
import base64
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Initialize Firebase
try:
    encoded_json = os.getenv("FIREBASE_CREDENTIALS")
    if not encoded_json:
        raise ValueError("FIREBASE_CREDENTIALS environment variable not set!")

    # Fix padding if needed
    missing_padding = len(encoded_json) % 4
    if missing_padding != 0:
        encoded_json += '=' * (4 - missing_padding)

    decoded_json = base64.b64decode(encoded_json).decode('utf-8')
    service_account_info = json.loads(decoded_json)

    cred = credentials.Certificate(service_account_info)
    firebase_admin.initialize_app(cred)
except Exception as e:
    print(f"Error initializing Firebase Admin SDK: {e}")
    exit(1)

# Get Firestore client
db = firestore.client()

def format_response(data_list):
    return jsonify({
        "status": "success",
        "data": data_list
    })

# ================================
# ROUTES
# ================================

@app.route('/api/service_types', methods=['GET'])
def get_service_types():
    try:
        docs = db.collection('service_types').stream()
        service_types = []
        for doc in docs:
            data = doc.to_dict()
            service_types.append({
                "service_type_id": data.get("service_type_id"),
                "service_type_nm": data.get("service_type_nm")
            })
        return format_response(service_types), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/brands/<service_type_id>', methods=['GET'])
def get_brands(service_type_id):
    try:
        docs = db.collection('brands').where('service_type_id', '==', service_type_id).stream()
        brands = []
        for doc in docs:
            data = doc.to_dict()
            brands.append({
                "brand_id": data.get("brand_id"),
                "brand_name": data.get("brand_name")
            })
        return format_response(brands), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/products/<brand_id>', methods=['GET'])
def get_products(brand_id):
    try:
        docs = db.collection('products').where('brand_id', '==', brand_id).stream()
        products = []
        for doc in docs:
            data = doc.to_dict()
            products.append({
                "product_id": data.get("product_id"),
                "product_nm": data.get("product_nm")
            })
        return format_response(products), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/submit_review', methods=['POST'])
def submit_review():
    try:
        data = request.get_json()

        required_fields = ['product', 'District', 'Star_Ratings', 'Yes_No']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    "status": "error",
                    "message": f"Missing or empty field: {field}"
                }), 400

        data["timestamp"] = firestore.SERVER_TIMESTAMP
        db.collection("reviews").add(data)

        return jsonify({
            "status": "success",
            "message": "Review submitted successfully!"
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"message": "Feedailp API is running"}), 200

# ================================
# RUN
# ================================
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
