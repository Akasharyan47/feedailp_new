import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box, TextField, Autocomplete } from "@mui/material";

const API_BASE_URL = "http://127.0.0.1:5000/api";

const App = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch service types on load
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/service-types`)
      .then((res) => {
        if (res.data.status === "success") {
          setServiceTypes(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching service types:", err));
  }, []);

  // Fetch brands when service type changes
  useEffect(() => {
    if (selectedServiceType && selectedServiceType.service_type_id) {
      axios
        .get(`${API_BASE_URL}/brands/${selectedServiceType.service_type_id}`)
        .then((res) => {
          if (res.data.status === "success") {
            setBrands(res.data.data);
            setProducts([]);
            setSelectedBrand(null);
            setSelectedProduct(null);
          }
        })
        .catch((err) => console.error("Error fetching brands:", err));
    } else {
      setBrands([]);
      setSelectedBrand(null);
      setProducts([]);
      setSelectedProduct(null);
    }
  }, [selectedServiceType]);

  // Fetch products when brand changes
  useEffect(() => {
    if (selectedBrand && selectedBrand.brand_id) {
      axios
        .get(`${API_BASE_URL}/products/${selectedBrand.brand_id}`)
        .then((res) => {
          if (res.data.status === "success") {
            setProducts(res.data.data);
            setSelectedProduct(null);
          }
        })
        .catch((err) => console.error("Error fetching products:", err));
    } else {
      setProducts([]);
      setSelectedProduct(null);
    }
  }, [selectedBrand]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Search & Select Product
      </Typography>

      <Box sx={{ mt: 3 }}>
        {/* Service Type Autocomplete */}
        <Autocomplete
          options={serviceTypes}
          getOptionLabel={(option) => option.service_type_nm || ""}
          value={selectedServiceType}
          onChange={(event, newValue) => setSelectedServiceType(newValue)}
          renderInput={(params) => <TextField {...params} label="Service Type" variant="outlined" />}
          isOptionEqualToValue={(option, value) => option.service_type_id === value.service_type_id}
          sx={{ mb: 3 }}
        />

        {/* Brand Autocomplete */}
        <Autocomplete
          options={brands}
          getOptionLabel={(option) => option.brand_name || ""}
          value={selectedBrand}
          onChange={(event, newValue) => setSelectedBrand(newValue)}
          renderInput={(params) => <TextField  size="small"
                {...params}
                variant="outlined"
                sx={{
                  margin: "0",
                  size: "small",
                }} {...params} label="Brand"   />}
          isOptionEqualToValue={(option, value) => option.brand_id === value.brand_id}
          disabled={!brands.length}
          sx={{ mb: 3 }}
        />

        {/* Product Autocomplete */}
        <Autocomplete
          options={products}
          getOptionLabel={(option) => option.product_nm || ""}
          value={selectedProduct}
          onChange={(event, newValue) => setSelectedProduct(newValue)}
          renderInput={(params) => <TextField {...params} label="Product" variant="outlined" />}
          isOptionEqualToValue={(option, value) => option.product_id === value.product_id}
          disabled={!products.length}
          sx={{ mb: 3 }}
        />
      </Box>
    </Container>
  );
};

export default App;
