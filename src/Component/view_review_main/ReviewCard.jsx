import React from 'react';
import { Box, Typography, Divider, Button, Rating, useMediaQuery, useTheme } from '@mui/material';

const ReviewCard = ({ review, onViewDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const maxWords = isMobile ? 20 : 30;

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  const truncatedComment = truncateText(review.comment, maxWords);

  return (
    <Box key={review.id} className='bd-callout bd-callout-warning' mb={2} p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="">User: {review.user}</Typography>
        <Typography variant="caption" color="textSecondary">
          Uploaded on: {review.date}
        </Typography>
      </Box>
      <Divider />

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Company: {review.company}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Product: {review.product}
          </Typography>
        </Box>
      </Box>

      <Box mt={1}>
        <Typography variant="body2" color="textSecondary">
          Comment: {truncatedComment}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Rating name={`rating-${review.id}`} value={review.rating} readOnly />

        <Box>
          <Button
            variant="contained"
            color="primary"
            className="rounded-pill"
            size="small"
            onClick={() => onViewDetails(review)}
            sx={{ background: '#006fbe' }}
          >
            View
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewCard;
