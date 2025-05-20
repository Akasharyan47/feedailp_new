// FullScreenDialog.jsx
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,useTheme,  useMediaQuery,
  Slide,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import ReviewTable from './My_ReviewTable';
import EditReviewDialog from './EditReviewDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialReviewData = {
  id: 2,
  user: 'User2',
  rating: 3,
  comment:
    'Another extensive comment with 20 lines of text. It delves into various aspects of the product, offering a nuanced perspective.  that adds depth to the user reviews.',
  date: '2022-01-19',
  company: 'Company B',
  product: 'Product Y',
  service_experience: {
    rating_professionalism_friendliness: "4",
    rating_knowledge_skills: 3,
    rating_service_quality: 2,
    pricing_reasonable: true,
    price_more_than_actual_amount: false,
    issue_resolved_within_time_frame: true,
    informed_about_additional_charges: true,
    clear_and_accurate_information: true,
    knowledgeable_representative: true,
    service_resolved_issues: false,
  },
};

const FullScreenDialog = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([initialReviewData]);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    handleClickOpen(); // Open the dialog
  };

  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    console.log('Delete review with ID:', reviewId);
  };

  const handleSaveEdit = (editedReview) => {
    // Implement logic to save the edited review
    // Update the reviews state or make an API call to update the data
    console.log('Save edited review:', editedReview);
    setReviews((prevReviews) =>
      prevReviews.map((review) => (review.id === editedReview.id ? editedReview : review))
    );
    setSelectedReview(null);
    handleClose(); // Close the dialog after saving
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        endIcon={<StarIcon />}
        size={isSmallScreen ? "small" : "medium"}
        sx={{ background: '#006fbe'  }}
        onClick={handleClickOpen}
      >
        My Review
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              My Review
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
          {/* Conditional rendering based on whether a review is selected or not */}
          {selectedReview ? (
            <EditReviewDialog
              open={open}
              onClose={() => {
                setSelectedReview(null);
                handleClose();
              }}
              onSave={handleSaveEdit}
              review={selectedReview}
            />
          ) : (
            <div>
              {/* Display reviews in the table */}
              <ReviewTable
                reviews={reviews}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
              />
            </div>
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default FullScreenDialog;
