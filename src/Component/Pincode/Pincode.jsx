import React, { useState } from "react";
import axios from "axios";
import { Box,  Typography, Container, Paper,TextField } from "@mui/material";

export const PincodeSearch = ({updatedistrict}) => {
  const [pincode, setPincode] = useState("");
  const [areaName, setAreaName] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  
  const handlePincodeChange = (event) => {
    const { value } = event.target;
    const inputPincode = value.replace(/\D/g, '');
    setPincode(inputPincode);   
    
    axios
      .get(`https://api.postalpincode.in/pincode/${inputPincode}`)
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          const firstResult = data[0];
          const { PostOffice } = firstResult;
          if (PostOffice && PostOffice.length > 0) {
            setAreaName(PostOffice[0].Name);
            setDistrict(PostOffice[0].District);
            setState(PostOffice[0].State);
            setCountry(PostOffice[0].Country);
            updatedistrict(PostOffice[0].District)
          } else {
            setAreaName("Not found");
            setDistrict("Not found");
            setState("Not found");
            setCountry("Not found");
          }
        }
         else {
          setAreaName("Invalid pin code");
          setDistrict("Invalid pin code");
          setState("Invalid pin code");
          setCountry("Invalid pin code"); 
        }
      })
      .catch((error) => {
        console.error("Error fetching pin code details:", error);
        setAreaName("Error fetching data");
        setDistrict(""); 
        setState("");
        setCountry("");
      });
  };

  return (
    <Container 
      maxWidth="xl"
      disableGutters>
      <Paper
        sx={{ 
          boxShadow: "none",
          border: "none", 
        }}
       >
        <Box>
        <TextField  
        placeholder="Enter pin code"
        value={pincode}
        onChange={handlePincodeChange} 
        inputProps={{
          pattern: '[0-9]*',
          maxLength: 7, 
        }}
        fullWidth
        variant="outlined"
        size="small" 
        color="info"
        />
        </Box> 
        <Box  backgroundColor="rgb(52, 63, 80)" sx={{ display: "flex", flexDirection: "row", textAlign:"center"}}>
          <Typography
            sx={{
              fontSize: "0.7rem",
            }}
           >
            {!areaName ? (
             null
            ) : (
              <div className="text-light bg-transparent">
                {areaName}
                <span  style={{ color: "#109907", fontWeight: "900" }}> | </span>
                {district}
                <span style={{ color: "#109907", fontWeight: "900" }}> | </span>
                {state}
                <span style={{ color: "#109907", fontWeight: "900" }}> | </span>  
                {country}
              </div>
            )}

          </Typography> 
        </Box> 
      </Paper> 
    </Container>   
  );
};
