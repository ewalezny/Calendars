import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import NotFound from "./components/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import AddProject from "./components/app/AddProject";

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
        <ThemeProvider theme={theme}>
            <HashRouter>
                <Routes>
                    <Route exact path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/reset' element={<Reset />}/>
                    <Route path='/addProject' element={<AddProject/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </HashRouter>
        </ThemeProvider>
    )
}

export default App;
