import React, { useState, useEffect, useRef } from 'react';
import { Typography, Pagination, Box, useScrollTrigger, Zoom, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ReviewCard from './ReviewCard';
import ReviewDetails from './ReviewDetails';
import reviewsData from '../../Data/view_review.json'; // Import the JSON file

const itemsPerPage = 10;

const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    // Scroll to the top of the document
    document.documentElement.scrollTop = 0;
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const ViewReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollAnchorRef = useRef(null);

  useEffect(() => {
    // Set the reviews state with data from the JSON file
    setReviews(reviewsData);
  }, []); // Empty dependency array means this effect runs once after initial render

  const handleViewDetails = (review) => {
    setSelectedReview(review);
  };

  const handleCloseDetails = () => {
    setSelectedReview(null);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(2);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedReviews = reviews.slice(startIndex, endIndex);

  return (
    <Typography>
      <div className='d-block bd-callout'>
        <div>
          <p>Average Rating: {calculateAverageRating(reviews)}</p>
        </div>

        {/* Display individual reviews */}
        <div className=''>
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} onViewDetails={handleViewDetails} />
          ))}
        </div>

        {/* Pagination */}
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(reviews.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Box>

        {/* Scroll to Top Button */}
        <ScrollTop>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>

      {selectedReview && (
        <ReviewDetails review={selectedReview} onCloseDetails={handleCloseDetails} />
      )}
 
      <div ref={scrollAnchorRef} id="back-to-top-anchor" />
    </Typography>
  );
};

export default ViewReviewPage;
