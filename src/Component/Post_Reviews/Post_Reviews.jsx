import React, { useState, useEffect } from "react";
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
import { PincodeSearch } from "../Pincode/Pincode";
import StarRatingInput from "../Rating/Rating";
import { DropdownWithCategories } from "../Company/Company";
import GmailAddressModal from "../Auth/index";
import Image_post_review from "../../IMAGE/postReview/Image_post_review.png";
import Cookies from "js-cookie";
 import axios from "axios";
import shield_610309 from "../../IMAGE/postReview/shield_610309.png";

const PostReviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isContinuing, setIsContinuing] = useState(false);
  const [district, setDistrict] = useState(null);
  const [districtError, setDistrictError] = useState("");
  const [rating, setRating] = useState(null);
  const [yesnodata, setYesNoData] = useState(null);
  const [reviewText, setReviewText] = useState("");


  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: " ",
  });

  const { vertical, horizontal, open, message  } = state;
  const [successVisible, setSuccessVisible] = useState(false);

  const showMessage = (msg) => {
    setState({
      vertical: "top",
      horizontal: "center",
      message: msg,
      open: true,
    });
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  }; 
  const closeModal = () => {
    setIsModalOpen(false); 
    // window.location.href = "/";
  };

  // Validate form fields
  const validateForm = () => {
       if (!selectedProduct) {
      showMessage("Please select product");
    } else if (!district) {
      setDistrictError("Please enter a pincode");
      showMessage("Please enter a pincode");
    } else if (!rating) {
      showMessage("Please provide a rating");
    } else if  (!yesnodata) {
      showMessage("Please answer YES or NO questions");
      return false;
    } 
    return true;
  };
 

const submitForm = async () => {
  if (!selectedProduct) {
    showMessage("Please select a product");
    return;
  }

  if (!district) {
    setDistrictError("Please enter a pincode");
    showMessage("Please enter a pincode");
    return;
  }

  if (!rating || rating.length === 0) {
    showMessage("Please provide a rating");
    return;
  }

  if (!yesnodata || yesnodata.length === 0) {
    showMessage("Please answer all Yes/No questions");
    return;
  }

  // ✅ Prepare data
  const Data = {
    product: selectedProduct,
    District: district,
    Star_Ratings: rating,
    Yes_No: yesnodata,
    reviewText: reviewText,
    email: Cookies.get("email") || "anonymous",
    name: Cookies.get("displayName") || "Anonymous User",
    id: Cookies.get("fduser") || "anonymous", 

  };

  console.log("Form submitted:", Data);

  try {
    // ✅ Send data to Flask API which saves it to Firebase
    const res = await axios.post("https://feedailp-backend-api.onrender.com/api/submit_review", Data);

    if (res.data.status === "success") {
      setSuccessVisible(true);
      // showMessage("Review submitted successfully!");

      // ⏳ Redirect after delay
      setTimeout(() => {
        setSuccessVisible(false);
        window.location.href = "/";
      }, 3000);
    } else {
      showMessage("Something went wrong. Try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    showMessage("Submission failed. Please try again.");
  }
};

 
  const handleContinue = () => {
    if (!validateForm()) return;

    setIsContinuing(true);

    const fduser = Cookies.get("fduser");
    if (fduser === "success") { 
      submitForm();
      setIsContinuing(false);
    } else { 
      openModal(); 
      setIsContinuing(false); 
    }
  };
 
  useEffect(() => {
    if (isModalOpen) {
      const interval = setInterval(() => {
        const fduser = Cookies.get("fduser");
        if (fduser === "success") { 
          setIsModalOpen(false);
          submitForm();
          clearInterval(interval);
        }
      }, 1000); 

      return () => clearInterval(interval);
    }
  }, [isModalOpen]);

  return (
    <Container maxWidth="xl" disableGutters sx={{ paddingTop: "30px" }}>
      <Snackbar
        variant="soft"
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
                {!district && districtError && (
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
        </Box>
      </Paper>
      <Container maxWidth="xl" disableGutters>
        <StarRatingInput ratingUpdate={setRating} YesNoData={setYesNoData} />
      </Container>

      <Grid container maxWidth="xl" className="justify-content-center">
      <Grid className="justify-content-center WYR mb-4">
        <Typography>*Write your review</Typography>

        <TextField
          multiline
          placeholder="review ... !"
          fullWidth
          rows={3}
          inputProps={{ maxLength: 200 }}
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
            console.log("Your review:", e.target.value); // 👈 Direct console output
          }}
          InputProps={{
            style: {
              fontFamily: "system-ui",
              fontWeight: "normal",
            },
          }}
        />
      </Grid> 
      </Grid>

      <Box component="footer">
        <div
          className="footer d-flex align-items-end flex-column  "
          style={{ backgroundColor: "#222a35", padding: "40px 0" }}
        >
          <div>
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
                color: "whitesmoke",
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

      {successVisible && (
        <Box
          sx={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "success.main",
            color: "white",
            px: 4,
            py: 2,
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1400,
            fontWeight: "bold",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          Review submitted successfully!
        </Box>
      )}

      <GmailAddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
};

export default PostReviews;
 
 
  