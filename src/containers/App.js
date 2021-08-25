import React from "react";
import { Menu } from "./menu/Menu";
import Dashboard from "./dashboard";
import { TaskBoard } from "./taskBoard/TaskBoard";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { MobileView } from "./mobileView";
import Settings from "./settings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./../helpers/themeStyles";
import { useSelector } from "react-redux";
import Notes from "./notes";

const AppContainer = styled.div`
    display: flex;
    height: 100%;
`;

function App() {
    const isDarkTheme = useSelector((s) => s.settings.darkTheme);

    if (!isMobile)
        return (
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                <>
                    <GlobalStyles />
                    <AppContainer>
                        <Router>
                            <Menu />
                            <Switch>
                                <Route path="/notes">
                                    <Notes />
                                </Route>
                                <Route path="/settings">
                                    <Settings />
                                </Route>
                                <Route path="/">
                                    <>
                                        <Dashboard />
                                        <TaskBoard />
                                    </>
                                </Route>
                            </Switch>
                        </Router>
                    </AppContainer>
                </>
            </ThemeProvider>
        );
    else {
        // redirects to intro website for mobile users after 1 sec
        setTimeout(() => {
            window.location = "https://fokus-website.netlify.com";
        }, 2000);

        return (
            <AppContainer>
                <MobileView />
            </AppContainer>
        );
    }
}

export default App;
