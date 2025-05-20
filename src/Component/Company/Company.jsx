import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Grid,
  FormControl, 
  Autocomplete, 
  TextField,
  Typography,
} from "@mui/material";

const apiUrl = "https://4wym6p3cli.execute-api.ap-south-1.amazonaws.com/dev/";

export const DropdownWithCategories = ({ onDataSelected }) => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    fetch(apiUrl + "service_types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status === "success") {
          setServiceTypes(data.data);
        } else {
          console.error("Failed to fetch service types:", data ? data.error : "Unknown error");
        }
      })
      .catch((error) => console.error("Error fetching service types:", error));
  }, []);
  

  useEffect(() => {
    if (selectedServiceType) {
      fetch(apiUrl + "brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ service_type_id: selectedServiceType }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setBrands(data.data);
          } else {
            console.error("Failed to fetch brands:", data.error);
          }
        })
        .catch((error) => console.error("Error fetching brands:", error));
    }
  }, [selectedServiceType]);

  useEffect(() => {
    // Fetch products based on selected service type and brand using POST
    if (selectedServiceType && selectedBrand) {
      fetch(apiUrl + "products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_type_id: selectedServiceType,
          brand_id: selectedBrand,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setProducts(data.data);
          } else {
            console.error("Failed to fetch products:", data.error);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [selectedServiceType, selectedBrand]);

  useEffect(() => {
    if (selectedServiceType && selectedBrand && selectedProduct) {
      const selectedData = {
        serviceType: selectedServiceType,
        brand: selectedBrand,
        product: selectedProduct,
      };
      onDataSelected(selectedData);
      console.log(selectedData);   
    }
  }, [selectedServiceType, selectedBrand, selectedProduct, onDataSelected]);
  
 
  return (
    <>
      <Grid 
        pt={2}
        container
        rowSpacing={0} 
        justifyContent="space-evenly"
       // columnSpacing={{ xs: 0, sm: 0, md: 2 }}
      >
       <Grid width={{  md: '10%', sm:"20%" }}></Grid>
 
        <Grid item xs={5} sm={4}    >
        <Typography  fontSize= "0.9rem"
                sx={{ color: "whitesmoke" }}>
            * Select Service Type
          </Typography>
          <FormControl required fullWidth size="small">
            <Select
              sx={{
                backgroundColor: "whitesmoke",
                "& .MuiSelect-icon": {
                  color: "#006fbe",
                  fontSize: 30,
                },
              }}
              labelId="serviceTypeLabel"
              id="serviceTypeSelect"
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
            >
              <MenuItem value=" " disabled>
                Select Service Type 
              </MenuItem>
              {serviceTypes.map((serviceType) => (
                <MenuItem
                  key={serviceType.service_type_id}
                  value={serviceType.service_type_id}
                >
                  {serviceType.service_type_nm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={5} sm={4}    >
        <Typography  fontSize= "0.9rem"
                sx={{ color: "whitesmoke" }}>
            * Company
          </Typography>
          <Autocomplete
            size="small"
            sx={{
              borderRadius: "4px",
              backgroundColor: "whitesmoke",
              "& .MuiAutocomplete-popupIndicator": {
                color: "#006fbe",
                padding: "0",
              },
              "& .css-i4bv87-MuiSvgIcon-root": {
                fontSize: "1.9rem",
              },
            }}
            fullWidth
            options={brands}
            getOptionLabel={(option) => option.brand_name}
            value={
              brands.find((brand) => brand.brand_id === selectedBrand) || null
            }
            onChange={(event, newValue) =>
              setSelectedBrand(newValue ? newValue.brand_id : "")
            }
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                variant="outlined"
                sx={{
                  margin: "0",
                  size: "small",
                }}
              />
            )}
          /> 
        </Grid>


        {/* <Autocomplete
          fullWidth
          options={products}
          getOptionLabel={(option) => option.product_nm}
          value={products.find(product => product.product_id === selectedProduct) || null}
          onChange={(event, newValue) => setSelectedProduct(newValue ? newValue.product_id : '')}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product"
              variant="outlined"
            />
          )}
        />  */}
      </Grid>

         <Grid item pt={4}  container rowSpacing={0}  
             xs={5} sm={4}   
             marginRight={{xs:"4%",sm:"3%", md:"6%" }} 
            style={{float:"right"}} >  

           <Grid item xs={12}  >
           <Typography  fontSize= "0.9rem"
                sx={{ color: "whitesmoke" }}
            >
              * Product
            </Typography>
            <Autocomplete
              size="small"
              sx={{
                borderRadius: "4px",
                backgroundColor: "whitesmoke",
                "& .MuiAutocomplete-popupIndicator": {
                  color: "#006fbe",
                  padding: "0",
                },
                "& .css-i4bv87-MuiSvgIcon-root": {
                  fontSize: "1.9rem",
                },
              }}
              fullWidth
              options={products}
              getOptionLabel={(option) => option.product_nm}
              value={
                products.find(
                  (product) => product.product_id === selectedProduct
                ) || null
              }
              onChange={(event, newValue) =>
                setSelectedProduct(newValue ? newValue.product_id : "")
              }
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  variant="outlined"
                  sx={{
                    margin: "0",
                    size: "small",
                  }}
                />
              )}
            />

         </Grid> 
          </Grid>
    </>
  );
};
 

 