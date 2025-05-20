import React from "react";
import Modal from "react-modal";
// import AutoLink from "./AutoLink";
 import EmailOTP from "./EmailOTP.js";
import WebAuthComponent from "./WebAuthComponent.js";
import MobileAuthComponent from "./MobileAuthComponent.js"
import { Box, Container } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

Modal.setAppElement("#root");

const GmailAddressModal = ({ isOpen, onClose }) => {
   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

   return (
      <Container>
         <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
               overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
               },
               content: {
                  margin: "auto",
                  minWidth: "300px",
                  minHeight: "200px",
                  maxWidth:"900px",
                  maxHeight:"550px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }
            }}>
            <Box style={{ alignSelf: "flex-end", margin: "10px" }}>
               <CloseIcon onClick={onClose} />
            </Box>
            <Box>
            <EmailOTP />  
            {isMobile ? <MobileAuthComponent /> : <WebAuthComponent />}
               
            </Box>
         </Modal>
      </Container>
   );
};

GmailAddressModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
};

export default GmailAddressModal;