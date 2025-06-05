import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Header from "./Component/Header/Header";
import ViewReviews from "./Component/View_Reviews/View_Reviews";
import PostReviews from "./Component/Post_Reviews/Post_Reviews.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyles from "./GlobalStyles";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Container from "react-bootstrap/Container";

function App() {
  const [showBanner, setShowBanner] = useState(true);

  const theme = {
    fontSize: {
      headerfontSizeH: "1.3rem",
      headerfontSizeM: "0.9rem",
      headerfontSizeL: "0.8rem",
      headingfontSize: "1.3rem",
    },
    colors: {
      heading: "rgb(52 63 80)",
      backgrountColorGray: "#333F50",
    },
    media: { mobile: "568px", tab: "600px" },
  };

  return (
    <GoogleOAuthProvider clientId="676303343264-oa0h9gmmf0sf9uvtqnh0popck4f7bfa8.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          {/* 📱 Show ONLY on mobile + tablet using Bootstrap classes */}
          {showBanner && (
            <Container
              className="d-block d-lg-none position-fixed top-50 start-50 translate-middle z-3"
              style={{ maxWidth: "400px" }}
            >
              <Alert
                severity="warning"
                sx={{
                  backgroundColor: "#fff3cd",
                  color: "#856404",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                  textAlign: "center",
                }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setShowBanner(false)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              >
                 Please enable <strong>Desktop Mode</strong> in your browser settings 🛠️. ✅  
                 
              </Alert>
            </Container>
          )}

          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/View_Reviews" element={<ViewReviews />} />
            <Route path="/Post_Reviews" element={<PostReviews />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
