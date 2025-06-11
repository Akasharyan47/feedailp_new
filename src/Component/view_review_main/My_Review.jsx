import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Slide,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import Cookies from 'js-cookie';
import axios from 'axios';

import ReviewTable from './My_ReviewTable';
import EditReviewDialog from './EditReviewDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  const email = Cookies.get('email');

  // 🔄 Fetch reviews for the logged-in user
  const fetchUserReviews = async () => {
    if (!email) return;

    try {
      const res = await axios.get(`http://localhost:5000//api/user_reviews?email=${email}`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  }

  useEffect(() => {
    if (open) fetchUserReviews();
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      // 🔥 Optionally call backend delete API
      // await axios.delete(`/api/delete_review?email=${email}&product_id=${reviewId}`);

      setReviews((prev) => prev.filter((r) => r.product_id !== reviewId));
      console.log(`Deleted review for product_id: ${reviewId}`);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleSaveEdit = async (editedReview) => {
    // 🔥 Optionally send update to backend here
    // await axios.put('/api/edit_review', editedReview);

    setReviews((prev) =>
      prev.map((r) =>
        r.product_id === editedReview.product_id ? editedReview : r
      )
    );
    setSelectedReview(null);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        endIcon={<StarIcon />}
        size={isSmallScreen ? 'small' : 'medium'}
        sx={{ backgroundColor: '#006fbe' }}
        onClick={handleClickOpen}
      >
        My Review
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
              My Review
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Box p={2}>
          {selectedReview ? (
            <EditReviewDialog
              open={!!selectedReview}
              onClose={handleClose}
              onSave={handleSaveEdit}
              review={selectedReview}
            />
          ) : (
            <ReviewTable
              reviews={reviews}
              onEdit={handleEditReview}
              onDelete={handleDeleteReview}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default FullScreenDialog;
