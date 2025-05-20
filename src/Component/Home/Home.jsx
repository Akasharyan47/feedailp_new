import React from 'react';
import MainBanner from './BannerComp/Banner'; 
import { Box } from '@mui/material';

const Home = () => {

  console.log("hit")
  return (
    <Box>
      <div className='main'> 
        <div style={{height:"60px"}}></div>
        <MainBanner />
      </div>

    </Box>
  );
} 


export default Home;