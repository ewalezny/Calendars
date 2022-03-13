import React from "react";
import {Container, Paper, Typography} from "@mui/material";

const Task = ({id, title, description}) => {
    return (
        <Paper elevation={4}
               sx={{margin: "20px"}}>
            <Typography
                variant="h5"
                component="h2"
                sx={{padding: "15px"}}
                color={"secondary"}
            >
                Zadanie: {title}
            </Typography>
            <Typography
                variant="p"
                component="h2"
                sx={{padding: "15px", fontWeight: "normal"}}
            >
                Opis: {description}
            </Typography>
        </Paper>
    )
}

export default Task;
