import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  
  body {
    background: ${({ theme }) => theme.body};
  }

`;

export const darkTheme = {
    type: "d",
    body: "#121212",
    backgroundMain: "#1E1E1E",
    backgroundSecondary: "#000",
    highlight: "#fff",
    primaryText: "#fff",
    secondaryText: "#000",
};

export const lightTheme = {
    type: "l",
    body: "#fffff3",
    backgroundMain: "#fff",
    backgroundSecondary: "#fff",
    highlight: "#000",
    primaryText: "#000",
    secondaryText: "#fff",
};
