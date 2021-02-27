import React from "react";
import { Menu } from "./menu/Menu";
import Dashboard from "./dashboard";
import { TaskBoard } from "./taskBoard/TaskBoard";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { MobileView } from "./mobileView";
import Settings from "./settings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AppContainer = styled.div`
    display: flex;
    height: 100%;
`;

function App() {
    if (!isMobile)
        return (
            <AppContainer>
                
                <Router>
                <Menu />
                    <Switch>
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
        );
    else {
        return (
            <AppContainer>
                <MobileView />
            </AppContainer>
        );
    }
}

export default App;
