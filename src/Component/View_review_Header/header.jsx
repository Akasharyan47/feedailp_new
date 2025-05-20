// Import necessary components and libraries
import React, { useState } from "react";
import {
  Grid,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material"; 
import { PincodeSearch } from "../Pincode/Pincode";
import FilterListIcon from "@mui/icons-material/FilterList";
import FullScreenDialog from "../view_review_main/My_Review";
// Define months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Main component
const FiveColumnHeader = () => {
  // State variables
  const [pincode, setPincode] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Handle filter button click
  const handleFilter = () => {
    // Check if all required fields are filled
    if (
      pincode === "" ||
      selectedMonth === "" ||
      selectedService === "" ||
      selectedCompany === "" ||
      selectedProduct === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Perform filtering logic here based on the filled values
    // For demonstration, I'm setting the filteredData to a dummy array
    setFilteredData([
      {
        service: selectedService,
        company: selectedCompany,
        product: selectedProduct,
        pincode: pincode,
        month: selectedMonth,
      },
    ]);
  };

  // Log the filtered data
  console.log(filteredData);

  return (
    <Box position="static" sx={{ pt: 5, mt: 2 }} className="">
      <Toolbar sx={{ backgroundColor: "rgb(52, 63, 80)" }}>
        <Grid container spacing={2} pt={5} pb={2}>
          <Grid item xs={12} sm={2}>
            <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
              * Service
            </Typography>
            <Select
              fullWidth
              variant="outlined"
              size="small"
              label="Select Service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              sx={{
                borderRadius: "4px",
                backgroundColor: "whitesmoke",
              }}
            >
              {/* Replace options with your actual services */}
              <MenuItem value="service1">Service 1</MenuItem>
              <MenuItem value="service2">Service 2</MenuItem>
            </Select>
          </Grid>

          {/* Column 2: Company Select */}
          <Grid item xs={12} sm={2}>
            <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
              * Company
            </Typography>
            <Autocomplete
              size="small"
              options={[] /* Replace with your options */}
              getOptionLabel={(option) => option.company_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  sx={{
                    margin: "0",
                    size: "small",
                    borderRadius: "4px",
                    backgroundColor: "whitesmoke",
                  }}
                />
              )}
              value={selectedCompany}
              onChange={(_, newValue) => setSelectedCompany(newValue)}
            />
          </Grid>

          {/* Column 3: Product Select */}
          <Grid item xs={12} sm={2}>
            <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
              * Product
            </Typography>
            <Autocomplete
              size="small"
              options={[] /* Replace with your options */}
              getOptionLabel={(option) => option.product_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  sx={{
                    margin: "0",
                    size: "small",
                    borderRadius: "4px",
                    backgroundColor: "whitesmoke",
                  }}
                />
              )}
              value={selectedProduct}
              onChange={(_, newValue) => setSelectedProduct(newValue)}
            />
          </Grid>

          {/* Column 4: Pincode Input */}
          <Grid item xs={12} sm={2}>
            <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
              * Pincode
            </Typography>
            <PincodeSearch
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </Grid>

          {/* Column 5: Select Month */}
          <Grid item xs={12} sm={2}>
            <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
              * Select Month
            </Typography>
            <Select
              fullWidth
              variant="outlined"
              size="small"
              label="Select Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              sx={{
                borderRadius: "4px",
                backgroundColor: "whitesmoke",
              }}
            >
              <MenuItem value="" disabled>
                Choose Month
              </MenuItem>
              {months.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Column 6: Filter Button */}
          <Grid item xs={12} sm={2} className="d-flex align-items-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilter}
              fullWidth
              sx={{
                borderRadius: "4px",
                maxWidth: "130px",
                background: "#006fbe",
              }}
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
      <Box sx={{ borderRadius: "4px", margin: "25px" }}>
         
        <FullScreenDialog />
      </Box>
    </Box>
  );
};

export default FiveColumnHeader;
