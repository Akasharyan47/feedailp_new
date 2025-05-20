import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Divider, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const EmailOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [otpError, setOTPError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSendOTP = () => {
    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }
    // Implement API call to send OTP to the email address.
    setIsSendingOTP(true);
    setTimeout(() => {
      console.log(`OTP sent to: ${email}`);
      setIsSendingOTP(false);
    }, 2000);  
  };

  const handleContinue = () => {
    setEmailError("");
    setOTPError(""); 
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Please enter your email @gmail.com");
      return;
    } 
    if (!otp) {
      setOTPError("Please enter the OTP.");
      return;
    } 
    setIsContinuing(true);
    setTimeout(() => {
      console.log(`Continue with: ${email} and OTP: ${otp}`);
      setIsContinuing(false);
    }, 2000); // Simulating API call delay.
  };

  return (
    <Grid container pt={4}   rowSpacing={0} alignItems="center" justifyContent="center" columnSpacing={{ xs: 1, sm: 5  }}>
      <Grid item xs={12} sm={5} sx={{paddingBottom:{ xs:"10px", sm:"0px"}}}  >
        <Box> 
          <TextField  
            size="small"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleSendOTP}
                    disabled={isSendingOTP}
                    sx={{ "&:hover": { textDecoration: "none", background: "none" } }}
                  >
                    <Link
                      href="#" 
                      variant="body2"
                      underline="none"
                    >
                      {isSendingOTP ? "Sending OTP..." : "Send OTP"}
                    </Link>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "&:hover": { textDecoration: "none", border: "none" },
             
            }}
          
          />
        </Box>
      </Grid>
      <Grid item xs={6} sm={3} lg={3}>
        <Box>
          <TextField
            size="small"
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            type="number"
            onChange={(e) => setOtp(e.target.value)}
            error={Boolean(otpError)}
            helperText={otpError} 
          />
        </Box>
      </Grid>
      <Grid item xs={6} sm={2} >
        <Box sx={{justifyContent:"flex-end",display:"flex",width:{xs:"80px",sm:"100px", md:"120px"}}}>
          <Button  
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleContinue}
            disabled={isContinuing}   sx={{height:"35px" ,fontSize:"0.8rem", fontWeight:"normal"}} >
            {isContinuing ? "Continuing..." : "Continue"}
         
          </Button>
        </Box>
      </Grid>
      <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Divider sx={{ width: "40%", borderColor: "gray" }} />
        <Typography sx={{ my:3, padding:" 0 10px" }}>OR</Typography>
        <Divider sx={{ width: "40%", borderColor: "gray" }} />
      </div>
    </Grid>
  );
};

export default EmailOTP;
