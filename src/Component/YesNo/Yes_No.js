import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "styled-components";

const TabletButtonComponent = ({ yesNo }) => {
  const questions = [
    "*Was the pricing of the service reasonable and fair?",
    "*Was the price charged more than the actual amount?",
    "*Was your issue resolved within the time frame?",
    "*Were you informed about any additional charges or fees before the service was provided?",
    "*Were you provided with clear and accurate information about the service you received?",
    "*Was the service representative knowledgeable and able to answer your questions effectively?",
    "*Did the service resolve your issues?",
  ];
  
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const handleButtonClick = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    const allQuestionsAnswered = answers.every((ans) => ans !== null);
    if (allQuestionsAnswered) {
      // console.log("All answers are filled:", answers);
      yesNo(answers);
    } 
  },);

  return (
    <Main>
      {questions.map((question, index) => (
        <div
          key={index}
          className="d-flex mt-3 w-auto justify-content-between  align-items-center"
        >
          <Typography fontSize={{xs:"0.9rem",sm:"1rem"}}>{question}</Typography>
          <ButtonGroup color="secondary" size="small"  >
            <Button   
            variant="text" 
              onClick={() => handleButtonClick(index, "yes")}
              sx={{    
                backgroundColor: answers[index] === "yes" ? "green" : "#f2f2f2",
                color: answers[index] === "yes" ? "white" : "#a6a6a6",
                "&:hover": {
                  color: "white",
                  backgroundColor: "green", 
                 
                },
              }}
              className="answer-button"
            >
              Yes
            </Button>
            <Button 
             variant="text" 
              onClick={() => handleButtonClick(index, "no")}
              sx={{
                // borderRadius:"30px",
                // transform: "none", // Remove transformation on hover
                // transition: "none",
                backgroundColor: answers[index] === "no" ? "#bb0000" : "#f2f2f2", 
                color: answers[index] === "no" ? "white" : "#a6a6a6",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#bb0000",  
                  
                },
              }}
              className="answer-button"
            >
              No
            </Button>
          </ButtonGroup>
        </div>
      ))} 
    </Main>
  );
};

export default TabletButtonComponent;

const Main = styled.div`
  color: ${({ theme }) => theme.colors.heading};

  Button {

    transform: none;
    top: "0";
    padding: 3px 20px;
    border: 2px solid #ecebeb;
  }
    @media (max-width: 768px) {
    Button { 
      padding: 0px 12px;
    }
  }  
`;
