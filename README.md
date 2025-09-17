# Feedailp

A comprehensive service experience review portal where users can share and explore reviews about companies' services in their local area. This platform helps consumers make informed decisions by providing authentic reviews before purchasing products or services.

## Features

- **Post Reviews**: Users can submit detailed reviews including company selection, location (pincode), star ratings, yes/no questions, and written feedback
- **View Reviews**: Browse and filter reviews by company, location, and ratings
- **Authentication**: Secure login using Google OAuth for verified reviews
- **Responsive Design**: Mobile-first design with desktop mode recommendations for mobile users
- **Real-time Data**: Reviews stored in Firebase Firestore for fast access
- **Service Categories**: Support for various service types and companies

## Tech Stack

### Frontend
- **React** - UI framework
- **Material-UI** - Component library
- **Bootstrap** - CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Google OAuth** - Authentication
- **Firebase** - Client-side Firebase integration
- **Styled Components** - CSS-in-JS

### Backend
- **Flask** - Python web framework
- **Firebase Admin SDK** - Server-side Firebase integration
- **Firestore** - NoSQL database
- **Flask-CORS** - Cross-origin resource sharing

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Firebase project with Firestore enabled
- Google OAuth credentials

### Frontend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd feedailp_new
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Update Google OAuth client ID in `src/App.js`
   - Configure Firebase config in `src/config/firebaseConfig.js`

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
   - Create a `.env` file with Firebase credentials
   - Set `FIREBASE_CREDENTIALS` with base64 encoded service account JSON

5. Start the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

## Usage

1. **Home Page**: Browse the main banner and explore available services
2. **Post Review**:
   - Select a company/service
   - Enter your pincode for location
   - Provide star rating
   - Answer yes/no questions
   - Write your review
   - Authenticate with Google if not logged in
3. **View Reviews**: Browse reviews with filtering options

## API Endpoints

### Submit Review
- **POST** `/api/submit_review`
- Body: `{ product, District, Star_Ratings, Yes_No, email, name, reviewText }`

### Get Reviews
- **GET** `/api/get_reviews`
- Query params: Various filters

### Get User Reviews
- **GET** `/api/get_user_reviews`
- Query params: User-specific filters

### Update Review
- **PUT** `/api/update_review`

### Service Types
- **GET** `/api/service_types`

## Project Structure

```
feedailp_new/
├── public/                 # Static assets
├── src/
│   ├── Component/          # React components
│   │   ├── Auth/          # Authentication components
│   │   ├── Company/       # Company selection
│   │   ├── Home/          # Home page components
│   │   ├── Post_Reviews/  # Review posting
│   │   ├── View_Reviews/  # Review viewing
│   │   └── ...
│   ├── config/            # Configuration files
│   ├── Data/              # Static data
│   ├── IMAGE/             # Image assets
│   └── ...
├── backend/
│   ├── routes/            # API route handlers
│   ├── utils/             # Utility functions
│   ├── app.py             # Main Flask app
│   └── requirements.txt   # Python dependencies
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue in the repository or contact the development team.
