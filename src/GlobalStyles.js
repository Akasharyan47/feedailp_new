import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ::placeholder {
    font-family: "system-ui";
    font-weight: normal;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }
  *, ::after, ::before {
    box-sizing: border-box;
}

/*  rating and yes no  */
.RatingContainer , .WYR { 
     width:80%; 
     margin-top: 50px;   
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
  } 
  .WYR{
    width: 94%;
  }
}  

.B_C_darkGray{ 
  background-color:rgb(52, 63, 80);
}
 
  .view_header1{
    margin-left: 23px;
    border-top: 68px solid whitesmoke;
  /* background-color:rgb(52, 63, 80); */
  height:150px; 
  position: relative; 
  }

  .bd-callout+.bd-callout {
    margin-top: -0.25rem;
}

.bd-callout-warning { 
    border: 2px solid #eee;
     border-left: 0.25rem solid #f0ad4e; 
}
.bd-callout {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;  
    border-radius: 0.25rem;
}
 /// end 

 @media (max-width: 600px) {
    .buttonStyle {
      padding: 5px 10px;
      font-size: 12px;
      background-color: red;
    }
  }

  
  @media (min-width: 601px) and (max-width: 900px) {
    .buttonStyle {
      padding: 6px 12px;
      font-size: 14px;
      background-color: red;
    }
  }
  
 
`;

export default GlobalStyles;
