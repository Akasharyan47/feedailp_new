import { Fragment } from "react"; 
import { Box, Typography } from "@mui/material";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import {Footer} from "../../Footer/footer";

const Explore = () => {
  return (
    <Fragment>  
        <Box sx={{ backgroundColor: "transparent", padding: "60px 25px" }}>
          <Box className="Explore">
            <Box
              className="Explore_Headline"
              sx={{ display: "flex", justifyContent: "center", alignItem:"center",mb:3 }}
            >
              <Typography variant="h4" sx={{textAlign:"center"}}>Explore Feedailp</Typography>
            </Box>
            <Box
              className="Explore_Discribe"
              sx={{  
                textAlignLast: "center",
                textAlign:"justify"
              }}> 
              <Typography variant="" sx={{ color:"rgb(52 63 80)" }}>
                Millions of people are visiting service centers in their local
                areas or booking services online to get their product issues
                repaired/fixed. Some of them are happy with the service
                experience and some are not. Struggling to find a platform where
                users can post about their service experiences or view reviews
                from others before purchasing a product? Well, this is the right
                place where you can post your service experiences and see
                reviews from others.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
                <FaChevronDown />
              </Box>
            </Box>
          </Box>
        </Box> 
        <div>
           <Footer />
        </div> 
    </Fragment>
  );
}; 
export default Explore;
