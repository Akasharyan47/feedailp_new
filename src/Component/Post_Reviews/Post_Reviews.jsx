import React, { Fragment, useState } from "react";
import {
  Grid,
  Hidden,
  Container,
  Snackbar,
  Typography,
  Paper,
  TextField,
  Box,
  Switch,
  Button,
} from "@mui/material";
// import axios from 'axios';
import { PincodeSearch } from "../Pincode/Pincode";
import StarRatingInput from "../Rating/Rating";
import { DropdownWithCategories } from "../Company/Company";
import GmailAddressModal from "../Auth/index";
import Image_post_review from "../../IMAGE/postReview/Image_post_review.png";

import shield_610309 from "../../IMAGE/postReview/shield_610309.png";

const PostReviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isContinuing, setIsContinuing] = useState(false);
  const [district, setDistrict] = useState(null);
  const [districtError, setDistrictError] = useState("");
  const [rating, setRating] = useState(null);
  const [yesnodata, setYesNoData] = useState(null);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: " ",
  });

  const { vertical, horizontal, open, message, severity } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };
  const showMessage = (msg) => {
    handleClick({
      vertical: "top",
      horizontal: "center",
      message: msg,
      severity: severity,
    })();
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  //Alart end
  // Email verification  start

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "/";
  };

  const handleContinue = () => {
    if (!selectedProduct) {
      showMessage("Please select product");
    } else if (!district) {
      setDistrictError("Please enter a pincode");
      showMessage("Please enter a pincode");
    } else if (!rating) {
      showMessage("Please provide a rating");
    } else if (!yesnodata) {
      showMessage("Please answer YES or NO questions");
    } else {
      Form();
      setIsContinuing(true);
      setTimeout(() => {
        openModal();
        setIsContinuing(false);
      }, 1000);
    }
  };

  const Form = () => {
    if (selectedProduct && district && rating && yesnodata) {
      const Data = {
        product: selectedProduct,
        District: district,
        Star_Ratings: rating,
        Yes_No: yesnodata,
      };
      console.log(Data);
    }
  };

  return (
    <Container maxWidth="xl" disableGutters sx={{ paddingTop: "30px" }}>
      <Snackbar
        variant="soft"
        severity="warning"
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        message={<> ⚠️ &nbsp; {message} </>}
      />
      <Paper
        className="pt-5 pb-3"
        sx={{
          backgroundColor: "rgb(52, 63, 80)",
          position: "relative",
        }}
      >
        <Hidden smUp></Hidden>
        <Hidden smDown>
        <img
  src={Image_post_review}
  alt=""
  style={{
    margin: "20px",
    position: "absolute",
    height: "30vh",
    top: "25%",
    backgroundRepeat: "no-repeat",
  }}
  loading="lazy"
/>

        </Hidden>

        <Grid item pt={3} pb={1} xs={12} sm={6}>
          <Typography
            fontWeight="500"
            color="whitesmoke"
            fontFamily="revert"
            align="right"
            paddingRight="6%"
            fontSize={{ xs: "1.4rem", sm: "2rem" }}
          >
            Share Your Service Experience: Your Opinion Matters
          </Typography>
        </Grid>
        <Box pt={2}>
          <DropdownWithCategories onDataSelected={setSelectedProduct} />
          <Grid
            item
            pt={4}
            container
            rowSpacing={0}
            justifyContent="right"
            marginLeft={{ xs: "8%", sm: "12px", md: "5%" }}
            xs={5}
            sm={7}
            md={6}
          >
            <Grid item sm={7} md={8}>
              <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
                * Pin Code
              </Typography>
              <div>
                <PincodeSearch updatedistrict={setDistrict} />
                {!district ? (
                  <>
                    {" "}
                    {districtError && (
                      <Typography
                        sx={{
                          position: "absolute",
                          color: "#f44336",
                          fontSize: "0.75rem",
                        }}
                      >
                        {districtError}
                      </Typography>
                    )}
                  </>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box>
            <Grid
              pt={2}
              pb={1}
              container
              alignItems="center"
              color="whitesmoke"
              justifyContent="flex-end"
            >
              <Typography marginRight={{ xs: "4%", sm: "3%", md: "6%" }}>
                <Switch /> Home Service
              </Typography>
            </Grid>
          </Box>
          {/* <Grid container  >
            <Grid  item backgroundColor="red" xs={12} md={9} sx={{ marginRight: { xs: "0px", md: "10px" } }} >   
               <TextField sx={{ marginLeft: { xs: "0px", md: "10px" } }}
                multiline
                placeholder="Enter Address"
                fullWidth
                rows={2}
                inputProps={{ maxLength: 200 }}
                InputProps={{
                  style: {
                    fontFamily: "system-ui",
                    fontWeight: "normal",
                  }
                }}
                // onChange={handleAddressChange}
              />  
            </Grid>
            <Switch /> Home Service
          </Grid>  */}
        </Box>
      </Paper>
      <Container maxWidth="xl" disableGutters>
        <StarRatingInput ratingUpdate={setRating} YesNoData={setYesNoData} />
      </Container>
 
      <Grid container  maxWidth="xl" className=" justify-content-center " >
        <Grid  className=" justify-content-center WYR  mb-4"
        > 
        <Typography>*Write youe review</Typography>
        
          <TextField 
            multiline
            placeholder="review ... !"
            fullWidth
            rows={3}
            inputProps={{ maxLength: 200 }}
            InputProps={{
              style: {
                fontFamily: "system-ui",
                fontWeight: "normal",
              },
            }}
            // onChange={handleAddressChange}
          /> 
        </Grid>
      </Grid>

      <Box component="footer">
        <div
          className="footer d-flex align-items-end flex-column  "
          style={{ backgroundColor: "#222a35", padding: "40px 0" }}
        >
          <div className=" ">
            <Typography pb={1}>
              <img
              className="img_fluid"
              style={{ height: "20px" }}
              src={shield_610309}
              alt=""
            />
            <span style={{ color: "whitesmoke", fontSize: "0.6rem" }}>
              {" "}
              ENCRYPTED &nbsp; &nbsp;
            </span> 
            </Typography>
  
            <Button
              onClick={handleContinue}
              disabled={isContinuing}
              type="button"
              size="small"
              className="btn w-auto rounded-pill "
              style={{
                padding: "4px 15px",
                right: "0",
                fontWeight: "500",
                backgroundColor: isContinuing ? "#0c623a" : "#ff9933",
                color: isContinuing ? "whitesmoke" : "whitesmoke",
                cursor: isContinuing ? "not-allowed" : "pointer",
              }}
            >
              {isContinuing ? "Continuing ..." : " Post Your Review"}
              &nbsp;{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                fill="whitesmoke"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </Button>
            &nbsp;&nbsp;
          </div>
        </div>
      </Box>
      <Box></Box>
      <Box>
        <GmailAddressModal isOpen={isModalOpen} onClose={closeModal} />
      </Box>
    </Container>
  );
};
export default PostReviews;
