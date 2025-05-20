import React  from "react";
import { Box } from "@mui/material"; 
import TemporaryDrawer from "../view_review_main/Mobile_Filter";
import FullScreenDialog from "../view_review_main/My_Review"; 

const MobileHeader = () => { 
  
  return (
    <Box container fullWidth>
      <Box
        pb={2}
        display="flex"
        justifyContent="flex-start"
        alignItems="end"
        className="container_fluid view_header1"
        sx={{ gap: "20px" }}
      >
        <TemporaryDrawer /> 
       <FullScreenDialog   /> 
      </Box>
    </Box>
  );
};

export default MobileHeader;
