import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button,
  Menu, MenuItem, Avatar, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import Cookies from 'js-cookie';
import GmailAddressModal from "../Auth/index";
import Logo from "../../IMAGE/Feedailp-transparent2.png";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const fullName = Cookies.get("displayName");
    if (fullName) {
      const first = fullName.split(" ")[0];
      setUsername(first);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await signOut(auth);
      ["uid", "email", "displayName", "photoURL", "accessToken"].forEach((key) =>
        Cookies.remove(key)
      );
      alert("You have been logged out.");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const ButtonStyle = {
    textDecoration: "none",
    transform: "none",
    alignItems: "center",
    height: "min-content",
    fontFamily: "Bahnschrift",
    fontSize: "0.9rem",
    fontWeight: "normal",
    color: "rgb(52 63 80)"
  };

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "?";

  return (
    <AppBar position="fixed" sx={{ background: "white", boxShadow: '0 0 8px rgba(0,0,0,0.1)' }}>
      <Toolbar>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src={Logo} alt="Logo" style={{ height: '55px', width: 'auto' }} />
        </Link>

        {/* Desktop Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 2 }}>
          <Button component={Link} to="/Post_Reviews" style={ButtonStyle} sx={{ display: { xs: 'none', sm: 'block' } }}>
            Post Review
          </Button>
          <Button component={Link} to="/View_Reviews" style={ButtonStyle} sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
            View Review
          </Button>
        </Box>

        {/* Desktop Auth Buttons */}
        {username ? (
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Typography sx={{ color: 'black', fontWeight: 500 }}>{username}</Typography>
            <Avatar sx={{ bgcolor: '#343f50', width: 32, height: 32 }}>
              {getInitial(username)}
            </Avatar>
            <IconButton onClick={handleLogout} color="error" title="Logout">
              <LogoutIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            onClick={openModal}
            sx={{
              display: { xs: 'none', sm: 'block' },
              backgroundColor: 'rgb(52, 63, 80)',
              color: 'white',
              textTransform: 'none',
              '&:hover': { backgroundColor: 'rgb(40, 50, 65)' }
            }}
          >
            Sign Up / In
          </Button>
        )}

        {/* Mobile Menu Icon */}
        <IconButton
          size="large"
          edge="end"
          sx={{ display: { xs: 'block', sm: 'none' }, ml: 1 }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleClose} component={Link} to="/Post_Reviews">Post Review</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/View_Reviews">View Review</MenuItem>
          {username ? (
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          ) : (
            <MenuItem onClick={() => { openModal(); handleClose(); }}>
              Sign Up / In
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
      <GmailAddressModal isOpen={isModalOpen} onClose={closeModal} />
    </AppBar>
  );
};

export default Header;
