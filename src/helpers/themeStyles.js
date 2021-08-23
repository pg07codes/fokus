import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  
  body {
    background: ${({ theme }) => theme.body};
  }

`;

export const darkTheme = {
    type: "d",
    body: "#121212",
    backgroundMain: "#141414",
    backgroundSecondary: "#000",
    highlight: "#fff",
    primaryText: "#fff",
    secondaryText: "#000",
    brightness: 0.80,
};

export const lightTheme = {
    type: "l",
    body: "#fffff3",
    backgroundMain: "#fff",
    backgroundSecondary: "#fff",
    highlight: "#000",
    primaryText: "#000",
    secondaryText: "#fff",
    brightness: 1,
};
