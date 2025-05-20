import * as React from 'react';
import { Box, Drawer, Button, List, useTheme, Divider, useMediaQuery, ListItem,Typography,TextField, MenuItem, Select } from '@mui/material';

import { MoveToInbox as InboxIcon, Mail as MailIcon, FilterList as FilterListIcon } from '@mui/icons-material';

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

// Sample JSON data
const jsonData = {
  serviceTypes: ["Service 1", "Service 2", "Service 3"],
  companies: {
    "Service 1": ["Company A", "Company B", "Company C"],
    "Service 2": ["Company X", "Company Y", "Company Z"],
    "Service 3": ["Company P", "Company Q", "Company R"],
  },
  products: {
    "Service 1": ["Product 1", "Product 2", "Product 3"],
    "Service 2": ["Product X", "Product Y", "Product Z"],
    "Service 3": ["Product A", "Product B", "Product C"],
  },
};

export default function TemporaryDrawer() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, setState] = React.useState({
    left: false,
  });

  const [serviceType, setServiceType] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [selectedMonth, setSelectedMonth] = React.useState("");

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSubmit = () => {
    // Perform your submit logic here
    console.log("Submit clicked!");
    console.log("Service Type:", serviceType);
    console.log("Company Name:", companyName);
    console.log("Product Name:", productName);
    console.log("Pin Code:", pinCode);
    console.log("Selected Month:", selectedMonth);

    // Add more logic as needed
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <List>
        {/* Service Type */}
        <ListItem>
          <TextField
            label="Service Type"
            variant="outlined"
            size="small"
            fullWidth
            required
            select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            {jsonData.serviceTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </ListItem>

        {/* Company Name */}
        <ListItem>
          <TextField
            label="Company Name"
            variant="outlined"
            size="small"
            fullWidth
            required
            select
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          >
            {jsonData.companies[serviceType]?.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </TextField>
        </ListItem>

        {/* Product Name */}
        <ListItem>
          <TextField
            label="Product Name"
            variant="outlined"
            size="small"
            fullWidth
            required
            select
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          >
            {jsonData.products[serviceType]?.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </TextField>
        </ListItem>

        {/* Pin Code */}
        <ListItem>
          <TextField
            label="Pin Code"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </ListItem>

        {/* Select Month */}
        <ListItem>
          <Typography fontSize="0.9rem" sx={{ color: "whitesmoke" }}>
            Select Month
          </Typography>
          <Select
            fullWidth
            variant="outlined"
            size="small"
            label="Select Month"
            required
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
        </ListItem>
      </List>
      <Divider />

      {/* Submit Button */}
      
      <Box mt={2} p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ borderRadius: "4px", background: "#006fbe" }}
          // onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          Submit
        </Button>

      </Box>
    </Box>
  );

  return (
    <div>
      <Button sx={{ background: "#dc3545" }} variant="contained" startIcon={<FilterListIcon />} onClick={toggleDrawer('left', true)} size={isSmallScreen ? "small" : "medium"}>Filter</Button>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}
