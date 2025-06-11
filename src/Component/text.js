import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
console.log("MyReviews component rendered" , { reviews });
  useEffect(() => {
    const email = Cookies.get('email');
    if (!email) return;

    axios.get(`http://localhost:5000/api/user_reviews?email=${email}`)
      .then(res => setReviews(res.data.reviews)
    
    )
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  return (
<div style={{ padding: '20px' }}>
      <h2>📝 My Submitted Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((r, index) => {
          const product = r.product?.product || {};
          const brand = r.product?.brand || {};
          const serviceType = r.product?.serviceType || {};

          return (
            <div key={index} style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>📦 Product: {product.product_nm || 'N/A'}</h3>
              <p><strong>🆔 Product ID:</strong> {product.product_id}</p>
              <p><strong>🏷️ Brand:</strong> {brand.brand_name || 'N/A'} ({brand.brand_id})</p>
              <p><strong>🔧 Service Type:</strong> {serviceType.service_type_nm || 'N/A'} ({serviceType.service_type_id})</p>
              <p><strong>📍 District:</strong> {r.District}</p>
              <p><strong>👤 Name:</strong> {r.name}</p>
              <p><strong>📧 Email:</strong> {r.email}</p>
              <p><strong>📝 Review:</strong> {r.reviewText}</p>
              <p><strong>⭐ Star Ratings:</strong> {Array.isArray(r.Star_Ratings) ? r.Star_Ratings.join(", ") : r.Star_Ratings}</p>
              <p><strong>✅ Yes/No Answers:</strong> {Array.isArray(r.Yes_No) ? r.Yes_No.join(", ") : r.Yes_No}</p>
              <p><strong>🕒 Submitted At:</strong> {r.timestamp}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyReviews;
