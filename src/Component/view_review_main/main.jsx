// import React, { useState, useEffect } from 'react';
// import {Stack,
//   Typography,
//   Box,
//   Rating,
//   Chip,
//   Divider,
//   Button,
//   Paper,
//   Slide,
//   FormControlLabel,
//   Switch,
// } from '@mui/material';

// const ViewReviewPage = () => {
//   const [reviews, setReviews] = useState([
//     { id: 1, user: 'User1', rating: 4, comment: 'Great UI design!', date: '2022-01-20', company: 'Company A', product: 'Product X' },
//     { id: 2, user: 'User2', rating: 3, comment: 'Needs improvement in responsiveness.', date: '2022-01-19', company: 'Company B', product: 'Product Y' },
//     { id: 3, user: 'User3', rating: 5, comment: 'Love the simplicity.', date: '2022-01-18', company: 'Company C', product: 'Product Z' },
//     // Add more reviews as needed
//   ]);

//   const [selectedReview, setSelectedReview] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);

//   useEffect(() => {
//     // Fetch reviews from your backend API and update the state
//     // Example: fetchReviewsFromBackend().then(data => setReviews(data));
//   }, []); // Empty dependency array means this effect runs once after initial render

//   const handleViewDetails = (review) => {
//     setSelectedReview(review);
//     setShowDetails(true);
//   };

//   const handleCloseDetails = () => {
//     setShowDetails(false);
//   };
  
//   return (
//     <Typography>
//       <div className='d-block bd-callout'>

//         <div>
//           <p>Average Rating: {calculateAverageRating(reviews)}</p>
//         </div>

//         {/* Display individual reviews */}
//         <div className=''>
//           {reviews.map((review) => (
//             <Box key={review.id} className='bd-callout bd-callout-warning' mb={2} p={2}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                 <Typography variant="h6">User: {review.user}</Typography>
//                 <Typography variant="caption" color="textSecondary">Uploaded on: {formatDate(review.date)}</Typography>
//               </Box>
//               <Divider />

//               <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
//                 <Box>
//                   <Typography variant="body2" color="textSecondary">Company: {review.company}</Typography>
//                   <Typography variant="body2" color="textSecondary">Product: {review.product}</Typography>
//                 </Box>

//                 <Box>
//                   <Button variant="contained"  size="small"  className="rounded-pill "  color="primary" onClick={() => handleViewDetails(review)} sx={{background:"#006fbe"}}>
//                     View
//                   </Button> 
//                 </Box>
//               </Box>

//               <Box mt={1}>
//                 <Typography variant="body2" color="textSecondary">Comment: {review.comment}</Typography>
//               </Box>
//               <Box mt={1}>
//                 <Rating name={`rating-${review.id}`} value={review.rating} readOnly />
//               </Box>
//             </Box>
//           ))}
//         </div>
//       </div>

//       {/* Slide-in details panel */}
//       <Slide direction="up" in={showDetails} mountOnEnter unmountOnExit>
//         <Paper elevation={4} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: 16 }}>
//           {selectedReview && (
//             <>
//               <Typography variant="h6">Details for User: {selectedReview.user}</Typography>
//               <Divider />

//               <Typography variant="body2" color="textSecondary">Company: {selectedReview.company}</Typography>
//               <Typography variant="body2" color="textSecondary">Product: {selectedReview.product}</Typography>
//               <Typography variant="body2" color="textSecondary">Comment: {selectedReview.comment}</Typography>
//               <Typography variant="body2" color="textSecondary">Rating: {selectedReview.rating}</Typography>

//               <FormControlLabel
//                 control={<Switch checked={selectedReview.featured} onChange={() => {}} />}
//                 label="Featured Review"
//               />

//               <Button variant="contained" color="secondary" onClick={handleCloseDetails}>
//                 Close
//               </Button>
//             </>
//           )}
//         </Paper>
//       </Slide>
//     </Typography>
//   );
// };

// // Helper function to calculate average rating
// const calculateAverageRating = (reviews) => {
//   if (reviews.length === 0) return 0;

//   const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//   return (totalRating / reviews.length).toFixed(2);
// };

// // Helper function to format date
 

// // Helper function to format date
// const formatDate = (dateString) => {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// export default ViewReviewPage;

import React from 'react'

const main = () => {
  return (
    <div>main</div>
  )
}

export default main
