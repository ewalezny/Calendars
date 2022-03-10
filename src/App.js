import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import Header from "./components/Header";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import Person from "./components/Person";
import FormDialog from "./components/FormDialog";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0d47a1"
        },
        secondary: {
            main: "#1976d2"
        }
    }
})

const App = () => {
    return (
        <HashRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <FormDialog />
                <Header/>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/generic/:id?' component={Person}/>
                    <Route component={NotFound}/>
                </Switch>
            </ThemeProvider>
        </HashRouter>
    )
}

export default App;
