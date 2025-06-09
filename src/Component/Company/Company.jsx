import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const API_BASE_URL = "https://feedailp-backend-api.onrender.com/api";

export const DropdownWithCategories = ({ onDataSelected }) => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/service_types`)
      .then((res) => {
        if (res.data.status === "success") {
          setServiceTypes(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching service types:", err));
  }, []);

  useEffect(() => {
    if (selectedServiceType?.service_type_id) {
      axios
        .get(`${API_BASE_URL}/brands/${selectedServiceType.service_type_id}`)
        .then((res) => {
          if (res.data.status === "success") {
            setBrands(res.data.data);
            setSelectedBrand(null);
            setProducts([]);
            setSelectedProduct(null);
          }
        })
        .catch((err) => console.error("Error fetching brands:", err));
    }
  }, [selectedServiceType]);

  useEffect(() => {
    if (selectedBrand?.brand_id) {
      axios
        .get(`${API_BASE_URL}/products/${selectedBrand.brand_id}`)
        .then((res) => {
          if (res.data.status === "success") {
            setProducts(res.data.data);
            setSelectedProduct(null);
          }
        })
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedServiceType && selectedBrand && selectedProduct) {
      const selectedData = {
        serviceType: selectedServiceType,
        brand: selectedBrand,
        product: selectedProduct,
      };
      onDataSelected(selectedData);
      console.log("Selected Data:", selectedData);
    }
  }, [selectedServiceType, selectedBrand, selectedProduct, onDataSelected]);

  return (
    <>
      <Grid pt={2} container justifyContent="space-evenly">
        <Grid width={{ md: "10%", sm: "20%" }} />

        <Grid item xs={5} sm={4}>
          <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
            * Select Service Type
          </Typography>
          <FormControl required fullWidth size="small">
            <Autocomplete
               size="small"
                  fullWidth
              options={serviceTypes}
              getOptionLabel={(option) => option.service_type_nm || ""}
              value={selectedServiceType}
              onChange={(event, newValue) => setSelectedServiceType(newValue)}
              isOptionEqualToValue={(option, value) =>
                option.service_type_id === value?.service_type_id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Service Type"
                  variant="outlined"
                />
              )}
              sx={{
                borderRadius: "4px",
                backgroundColor: "whitesmoke",
                "& .MuiAutocomplete-popupIndicator": { color: "#006fbe" },
                "& .MuiInputLabel-root": {
                  color: "#adadad",
                  fontSize: "0.9rem",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Focused label color
                fontSize: "0rem",
              },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "whitesmoke",

                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={5} sm={4}>
          <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
            * Company
          </Typography>
          <Autocomplete
            size="small"
            fullWidth
            options={brands}
            getOptionLabel={(option) => option.brand_name || ""}
            value={selectedBrand}
            onChange={(event, newValue) => setSelectedBrand(newValue)}
            isOptionEqualToValue={(option, value) =>
              option.brand_id === value?.brand_id
            }
            renderInput={(params) => (
              <TextField {...params} label="Brand" variant="outlined" />
            )}
            disabled={!brands.length}
            sx={{
              borderRadius: "4px",
              backgroundColor: "whitesmoke",
              "& .MuiAutocomplete-popupIndicator": { color: "#006fbe" },
              "& .MuiInputLabel-root": {
                color: "#adadad",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Focused label color
                fontSize: "0rem",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "whitesmoke",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid
        item
        pt={4}
        container
        xs={5}
        sm={4}
        style={{ float: "right" }}
        marginRight={{ xs: "4%", sm: "3%", md: "6%" }}
      >
        <Grid item xs={12}>
          <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
            * Product
          </Typography>
          <Autocomplete
            size="small"
            fullWidth
            options={products}
            getOptionLabel={(option) => option.product_nm || ""}
            value={selectedProduct}
            onChange={(event, newValue) => setSelectedProduct(newValue)}
            isOptionEqualToValue={(option, value) =>
              option.product_id === value?.product_id
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Product" />
            )}
            sx={{
              borderRadius: "4px",
              backgroundColor: "whitesmoke",
              "& .MuiAutocomplete-popupIndicator": { color: "#006fbe" }, 
              "& .MuiInputLabel-root": {
                color: "#adadad",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Focused label color
                fontSize: "0rem",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "whitesmoke",
              }, 
            }}
            disabled={!products.length}
          />
        </Grid>
      </Grid>
    </>
  );
};
