import React from 'react';
import Header from '../View_review_Header/header';
import { Paper, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import ViewReviewPage from '../view_review_main/ViewReviewPage';
import MobileHeader from '../View_review_Header/mobile_header';
 
const ViewReviews = () => {
  const theme = createTheme();  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <ThemeProvider theme={theme}>
      <Paper  >
        {isMobile ? <MobileHeader /> : <Header />}
        <ViewReviewPage />
      </Paper>
    </ThemeProvider>
  );
};

export default ViewReviews;
