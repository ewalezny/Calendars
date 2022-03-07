import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import Header from "./Header";
import Main from "./Main";
import Person1 from "./Person1";
import Person2 from "./Person2";
import Person3 from "./Person3";
import Person4 from "./Person4";
import Person5 from "./Person5";
import NotFound from "./NotFound";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0d47a1"
        },
        secondary: {
            main: "#1565c0"
        }
    }
})

const App = () => {
    return (
        <HashRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Routes>
                    <Route exact path='/' component={Main}/>
                    <Route path='/person1' component={Person1}/>
                    <Route path='/person2' component={Person2}/>
                    <Route path='/person3' component={Person3}/>
                    <Route path='/person4' component={Person4}/>
                    <Route path='/person5' component={Person5}/>
                    <Route component={NotFound}/>
                </Routes>
            </ThemeProvider>
        </HashRouter>
    )
}

export default App;
