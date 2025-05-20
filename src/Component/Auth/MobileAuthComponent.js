import React, { useEffect, useState } from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";
import { BsGithub, BsMicrosoft, BsApple, BsGoogle } from "react-icons/bs";
import { auth, googleProvider } from "../../config/firebaseConfig";
import {
  signInWithPopup,
  onAuthStateChanged,
  getRedirectResult,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import Cookies from "js-cookie";

const MobileAuthComponent = () => {
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
        // Fallback to popup login if redirect fails (common on mobile)
        if (
          error.message.includes("missing initial state") ||
          error.message.includes("sessionStorage") ||
          error.message.includes("storage")
        ) {
          await googleLoginPopup();
        }
      }
    };

    checkRedirect();
    return () => unsubscribe();
  }, []);

  const googleLoginPopup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setUserDetails(result.user);
        await storeUserInCookies(result.user);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Popup login error:", error.message);
    }
  };

  // Use redirect login for mobile friendliness
  const googleLoginRedirect = () => {
    signInWithRedirect(auth, googleProvider);
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
    justifyContent: "center",
    textTransform: "none",
    padding: "10px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    color: "gray",
    fontWeight: 500,
    fontSize: "16px",
    backgroundColor: "white",
  };
  
  // Placeholder handlers for other providers
  const handleMicrosoftLogin = () => {};
  const handleGithubLogin = () => {};
  const handleAppleLogin = () => {};

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
       
      bgcolor="#f5f5f5"
      px={2}
    >
      <Box
        display="flex"
        flexDirection="column"
        pt={1}
        gap={2}
        sx={{ width: { xs: "100%", sm: "320px" } }}
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
            <Button onClick={googleLoginRedirect} sx={buttonStyle}>
  <Box display="flex" alignItems="center" gap={1}>
    <BsGoogle size={20} style={{ color: "#4285F4" }} />
    <Typography fontSize="16px">Continue with Google</Typography>
  </Box>
</Button>

<Button onClick={handleMicrosoftLogin} sx={buttonStyle}>
  <Box display="flex" alignItems="center" gap={1}>
    <BsMicrosoft size={20} style={{ color: "#0078D4" }} />
    <Typography fontSize="16px">Continue with Microsoft</Typography>
  </Box>
</Button>

<Button onClick={handleGithubLogin} sx={buttonStyle}>
  <Box display="flex" alignItems="center" gap={1}>
    <BsGithub size={20} style={{ color: "#333" }} />
    <Typography fontSize="16px">Continue with GitHub</Typography>
  </Box>
</Button>

<Button onClick={handleAppleLogin} sx={buttonStyle}>
  <Box display="flex" alignItems="center" gap={1}>
    <BsApple size={20} style={{ color: "#000" }} />
    <Typography fontSize="16px">Continue with Apple</Typography>
  </Box>
</Button>

          </>
        )}
      </Box>
    </Box>
  );
};

export default MobileAuthComponent;
