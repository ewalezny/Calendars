import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import NotFound from "./components/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import AddTask from "./components/app/AddTask";
import TasksList from "./components/app/TasksList";
import Calendars from "./components/app/Calendar";

const theme = createTheme({
    palette: {
        primary: {
            main: "#284862"
        },
        secondary: {
            main: "#72875b"
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
                    <Route path='/addTask' element={<AddTask/>}/>
                    <Route path={'/tasksList'} element={<TasksList/>}/>
                    <Route path={'/calendar'} element={<Calendars/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </HashRouter>
        </ThemeProvider>
    )
}

export default App;
