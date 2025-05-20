import React  from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Header from "./Component/Header/Header";
import ViewReviews from "./Component/View_Reviews/View_Reviews";
import PostReviews from "./Component/Post_Reviews/Post_Reviews.jsx"; 
 
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyles from "./GlobalStyles"; 
import { GoogleOAuthProvider } from "@react-oauth/google";
 
function App() {
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   const theUser = localStorage.getItem("user");

  //   if (theUser && !theUser.includes("undefined")) {
  //     setUser(JSON.parse(theUser));
  //   }
  // }, []);
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
    media: { mobile: "768px", tab: "800px" },
  };
  return (
    <GoogleOAuthProvider clientId="676303343264-oa0h9gmmf0sf9uvtqnh0popck4f7bfa8.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Header />
          <Routes>
            {/* <Route
              path="/"
              element={user?.email ? <Navigate to="/Home" /> : <Landing />}
            />
            <Route
              path="/Signup"
              element={user?.email ? <Navigate to="/Home" /> : <Signup />}
            /> */}
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
