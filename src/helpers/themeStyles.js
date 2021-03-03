import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  
  body {
    background: ${({ theme }) => theme.body};
  }

`;

export const darkTheme = {
    body: "#141413",
    backgroundMain: "#150e06",
    backgroundSecondary: "#fff",
    primaryText:"#fff",
    secondaryText:"#000",
    highlightedText:"",
};

export const lightTheme = {
    body: "#fffff3",
    backgroundMain: "#fff",
    backgroundSecondary: "#000",
    primaryText:"#000",
    secondaryText:"#fff",
    highlightedText:"",
};
