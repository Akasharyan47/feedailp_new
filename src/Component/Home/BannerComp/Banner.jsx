import React, { Fragment } from 'react' 
import { styled } from 'styled-components'; 
import BannerImg from "../../../IMAGE/HomeBanner/feedailp_banner.png";
import Explore from '../ExploreComp/Explore'; 
import { NavLink } from "react-router-dom";
import { Button } from '@mui/material';
 
const Banner = () => {
  return (
    <Fragment>
      <HeaderBanner>
        <div className=" container_fluid  ">
          <div className="banner  ">
            <img className="img-fluid" src={BannerImg} alt="MainBanner"></img>
            <div className="textblock ">
              <div className="bannertext d-flex align-items-center w-auto h-100 ">
                <div className="row ps-3 m-0 d-inline   ">
                  <div className="col-12 cl1">
                    <span>Welcome to our service experience </span>
                    <span>review portal!</span>
                  </div>
                  <div className="col-12 cl2 ">
                    <span className="m-0">
                      “Have you ever thought of having a platform where you
                      could submit your valuable reviews about the company's
                      service experience in your local area?
                    </span>
                    <span className="m-0">
                      A platform where you could check out reviews about the
                      service experience of companies before buying a product! “
                    </span>
                  </div>

                  <NavLink to="/Post_Reviews">
                    <Button size="small" className='btn'> 
                      Post Your Review 
                    </Button>
                     
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderBanner>
      <Explore />
    </Fragment>
  );
}
const HeaderBanner = styled.div`
  font-family: Bahnschrift Light;

  .btn {
      display: inline-block;
      padding: 7px 15px; 
      color: white;    
      font-size: 12px;
      text-align: center;
      text-decoration: none;
      border: 2px solid #0674bd; 
      background-color: ${({ theme }) => theme.colors.backgrountColorGray};  
      border-radius:25px;  
     
    }

    /* Hover effect */
    .btn:hover {
      background-color: #3498db;
      color: #ffffff;
    }

  .banner {
    display: inline;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .banner img {
    border-bottom: 10px solid orange;
    min-height: 30vh;
    max-height: 300px;
    object-fit: cover;
    width: 100%;
  }
  .textblock {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
  }

  .bannertext {  
    .cl1,
    .cl2 {
      position: relative;
      color: white;
      display: flex;
      flex-direction: column;
    }
    .cl1 {
      font-size: 2.5vw;
      span {
        letter-spacing: 1px;
      }
    }
    .cl2 {
      padding-top: 5px;
      padding-bottom: 15px;
      span {
        font-size: 1vw;
      }
    }
 
  }

   @media only screen and (max-width: 600px) {
    .bannertext {
      .cl1 span {
        font-size: 4.8vw;
      }
      .cl2 span {
        font-size: 1.7vw;
      }
    }
  }  

  @media only screen and (max-width: ${({ theme }) => theme.media.tab}) {
    .bannertext {
      .cl1 {
        font-size: 4.5vw;
      }
      .cl2 span {
        font-size: 1.2vw;
      }
    }
  }
 
`;

export default Banner;