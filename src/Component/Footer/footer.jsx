import React, { useState } from 'react';
import { Box, Container, Grid, Link, Typography, Divider, } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FooterDialog from "../FooterDialog/FooterDialog";
import styled from 'styled-components';


const HoverButton = styled.button`
color: #b9b7b7;  
  transition: color 0.3s, 
  margin-left 0.4s; 
  text-decoration: none;  
  border: none; 
  background-color: transparent;
 padding:0; 
 font-size: 0.9rem;
 font-weight: 500;
  &:hover {
    margin-left: 7px;  
  }
`;



export const Footer = () => { 
    const [isModalOpen, setIsModalOpen] = useState(false); 
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  

 
const Typograph = {
    marginBottom:"5px",
    width:"min-Content",
     color:"whitesmoke",
     borderBottom: '2px solid gray', 
} 

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#333F50',
                width: '100%',
                bottom: '0px',
                backgroundPosition: 'bottom',
            }}>

            <Container> 
                <Grid container justifyContent="space-between"   >
                    <Grid item xs={12} sm={4} pt={3}   alignSelf="center" >   
                            <Typography style={Typograph} >
                             About
                            </Typography>
                            <Typography color="#b9b7b7" fontWeight="400" fontSize="0.8rem"  >
                            We're on a mission to collect your feedback and promptly tackle issues. Your insights are our compass for improvement, helping us create a seamless experience. 
                            </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={7} pt={3} pb={2}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={6} >
                            <Typography  style={Typograph}>Feedailp</Typography> 
                                <Link underline="none" className='d-block' >
                                    <HoverButton onClick={openModal}  >
                                        About Us
                                    </HoverButton> 
                                    <FooterDialog
                                        open={isModalOpen}
                                        close={closeModal}
                                      /> 
                                </Link>
                                <Link underline="none" className='d-block'    >
                                    <HoverButton>
                                       Guidelines
                                    </HoverButton>
                                </Link>
                                <Link underline="none" className='d-block'   >
                                    <HoverButton>
                                        Terms of Use
                                    </HoverButton>
                                </Link>
                                <Link underline="none" className='d-block'  >
                                    <HoverButton>
                                        Privacy & Cookies
                                    </HoverButton>
                                </Link>
                            </Grid>
                            <Grid item xs={6} sm={6} > 
                            <Typography style={Typograph}>Connect</Typography>
                                <Link underline="none" className='d-block' > 
                                    <HoverButton  >
                                    <FacebookIcon  fontSize='small'  /> &nbsp;
                                    <TwitterIcon   fontSize='small'  /> &nbsp;
                                    <InstagramIcon  fontSize='small'  /> &nbsp;
                                    <LinkedInIcon  fontSize='small' /> 
                                    </HoverButton>
                                </Link>
                                <Link underline="none" className='d-block'>
                                    <HoverButton  >
                                       
                                    </HoverButton>
                                </Link>
                                <Link underline="none" className='d-block'>
                                    <HoverButton  >
                                        feedailp@gmail.com
                                    </HoverButton>
                                </Link>
                                <Link underline="none" className='d-block'>
                                    <HoverButton  >
                                      
                                        7873786347123
                                    </HoverButton>
                                </Link>
                                 
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12} mt={2} p={0}  >
                        <Box
                            display="flex" 
                             
                            sx={{ gap: '10px', width: 'min-content',color:"#b9b7b7" }} >
                            <Link   >
                                <FacebookIcon  fontSize='small'  />
                            </Link>
                            <Link   >
                                <TwitterIcon   fontSize='small'  />
                            </Link>
                            <Link   >
                                <InstagramIcon  fontSize='small'  />
                            </Link>
                            <Link   >
                                <LinkedInIcon  fontSize='small' />
                            </Link>
                        </Box>
                    </Grid> */}
                </Grid>
                <Divider variant="middle" sx={{ my: 1, borderColor: 'gray', width: '100%', display: 'flex', justifyContent: 'center' }} />
                <Typography
                    variant="body2"
                    pb={2}
                    sx={{ textAlign: 'center', color: '#fff', fontSize: '0.9rem', fontWeight: "lighter" }}
                >
                    Copyright © 2023, Feedailp, Inc. “Feedailp" and logo are registered trademarks of
                    Feedailp, Inc
                </Typography>
            </Container>
        </Box>
    );
};  
