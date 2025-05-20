import React, { useEffect, useState } from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";
import { BsGithub, BsMicrosoft, BsApple, BsGoogle } from "react-icons/bs";
import { auth, googleProvider } from "../../config/firebaseConfig";
import {
  signInWithPopup,
  onAuthStateChanged,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";

const WebAuthComponent = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserDetails(user);
        await storeUserInCookies(user);
      } else {
        setUserDetails(null);
        clearCookies();
      }
    });

    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUserDetails(result.user);
          await storeUserInCookies(result.user);
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Redirect login error:", error.message);
      }
    };

    checkRedirect();
    return () => unsubscribe();
  }, []);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setUserDetails(result.user);
        await storeUserInCookies(result.user);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearCookies();
      setUserDetails(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const storeUserInCookies = async (user) => {
    const token = await user.getIdToken();
    Cookies.set("uid", user.uid, { expires: 1 });
    Cookies.set("email", user.email, { expires: 1 });
    Cookies.set("displayName", user.displayName, { expires: 1 });
    Cookies.set("photoURL", user.photoURL, { expires: 1 });
    Cookies.set("accessToken", token, { expires: 1 });
  };

  const clearCookies = () => {
    ["uid", "email", "displayName", "photoURL", "accessToken"].forEach((key) =>
      Cookies.remove(key)
    );
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textTransform: "none",
    padding: "4px 10px", // reduced padding
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    width: "100%",
    color: "gray",
    fontWeight: 400, // slightly lighter font
    fontSize: "14px", // smaller font
    gap: "8px", // smaller gap
    backgroundColor: "white",
    minHeight: "36px", // control button height
  };


  // Placeholder handlers
  const handleMicrosoftLogin = () => { };
  const handleGithubLogin = () => { };
  const handleAppleLogin = () => { };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="#f5f5f5" >
      <Box
        display="flex"
        pt={1}
        gap={2}
        flexDirection="column"
        sx={{ width: { xs: "80%", sm: "320px" } }}
      >

        {userDetails ? (
          <>
            <Avatar
              src={userDetails.photoURL}
              alt={userDetails.displayName}
              sx={{ width: 72, height: 72, margin: "0 auto" }}
            />
            <Typography variant="h6" mt={2} textAlign="center">
              Welcome, {userDetails.displayName || "User"}!
            </Typography>
            <Button
              onClick={logout}
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
              fullWidth
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6" mb={2} fontWeight="bold" textAlign="center">
              Sign in to Continue
            </Typography>


            <Button onClick={googleLogin} size='small' className='buttonStyle'>
              <BsGoogle size={20} style={{ color: '#4285F4' }} />
              <Typography className='butttonStyle' style={buttonStyle} ml={2} sx={{ height: { xs: "30px", sm: "100%" }, fontSize: { xs: "11px", sm: "100%" }, width: { xs: "50%" } }}>Continue with Google</Typography>
            </Button>

            <Button onClick={handleMicrosoftLogin} size='small' >
              <BsMicrosoft size={20} style={{ color: '#0078D4' }} />
              <Typography style={buttonStyle} ml={2} sx={{ height: { xs: "30px", sm: "100%" }, fontSize: { xs: "11px", sm: "100%" }, width: { xs: "50%" } }}>Continue with Microsoft</Typography>
            </Button>

            <Button onClick={handleGithubLogin} size='small'>
              <BsGithub size={20} style={{ color: '#333' }} />
              <Typography style={buttonStyle} ml={2} sx={{ height: { xs: "30px", sm: "100%" }, fontSize: { xs: "11px", sm: "100%" }, width: { xs: "50%" } }}>Continue with GitHub</Typography>
            </Button>

            <Button onClick={handleAppleLogin} size='small' >
              <BsApple size={20} style={{ color: '#000' }} />
              <Typography style={buttonStyle} ml={2} sx={{ height: { xs: "30px", sm: "100%" }, fontSize: { xs: "11px", sm: "100%" }, width: { xs: "50%" } }}>Continue with Apple</Typography>
            </Button>

          </>
        )}
      </Box>
    </Box>
  );
};

export default WebAuthComponent;
