import React, { useState,useEffect } from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import TabletButtonComponent  from "../YesNo/Yes_No"; 
import { styled } from "styled-components";

const RatingComponent = ({ratingUpdate, YesNoData }) => {
   const [ratings, setRatings] = useState(Array(4).fill(0)); 
    const handleRatingClick = (questionIndex, value) => {
    const newRatings = [...ratings];
    newRatings[questionIndex] = value;
    setRatings(newRatings);
  }; 
 useEffect(() => {
  const allQuestionsAnswered = ratings.every((ans) => ans !== 0);  
  if (allQuestionsAnswered) {
    // console.log("All answers are filled:", ratings);
    ratingUpdate(ratings) 
  }
   },);  


const recieveYesNO = (data) => {
  YesNoData(data);
} 

  const customColors = ["#770606", "#af0000", "#ff2a00", "#ff5500", "#ff8000", "#fae96a", "#cced03", "#9acd32", "#7ecc31", "#31cc31"];

  const renderRatingItems = (questionIndex) => { 
    const items = [];
    for (let i = 1; i <= 10; i++) {
      const itemStyle = {
        color: i <= ratings[questionIndex] ? customColors[i - 1] : "#ececec",
      };
      items.push(
        <div key={i} style={itemStyle} onClick={() => handleRatingClick(questionIndex, i)}>
          <StarIcon />
        </div>
      );
    }
    return items;
  };

  const questions = [
    "*Hate your overall service experience with the company? ",
    "*Rate the professionalism and friendliness of the service representative during service contact?",
    "*Rate the knowledge and skills of the service representative?",
    "*Rate the quality of the service?"
  ]; 
  return (
    <Main>
    <Box className="RatingContainer  ">
      {questions.map((question, index) => (
        <Box key={index} className="mainbox">
           <Typography fontSize={{xs:"0.9rem", sm:"1rem" }}>
            {question} 
           </Typography> 
             <div className="star-container "  required >
                {renderRatingItems(index)} 
                <span className="align-self-end" style={{fontWeight:"lighter" , justifyContent:"end"}}>
                  Rating:{ratings[index]}
                  </span> 
              </div>  
        </Box>
      ))} 
      <div style={{ height: "50px" }}></div>
      <TabletButtonComponent   yesNo={recieveYesNO} />
    </Box>
    </Main>

  );
};
const Main = styled.div` 
  display: flex;
  flex-direction: column; 
  align-items: center; 
  color: ${({ theme }) => theme.colors.heading};
  
 .mainbox{  
   margin : 25px 0px;   
 } 
.star-container {   
  display: flex; 
  overflow: hidden;
  justify-content: center;  
  width: 70%;  
}  
.star-container {
    display: flex;
    overflow: hidden;
    justify-content: center;
    width: 70%;

    > div {
      padding-top: 10px;
      flex: 1;
      cursor: pointer;
      display: flex;
      justify-content: center;
    }
  }
@media (max-width: 900px) {
  .star-container {   
    display: flex;
    justify-content: center; 
    width: 100%; 
  }
  .RatingContainer{
    margin: 3%; 
     width:auto;  
  } }   
`;

export default RatingComponent;
 