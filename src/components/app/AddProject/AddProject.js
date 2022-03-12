import React from "react";
import {Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import Header from "../Header";

const AddProject = () => {
    return (
        <>
            <Header />
            <Container maxWidth="xl">
                <form>
                    <Paper elevation={4}
                           sx={{margin: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Typography
                            variant="h4"
                            component="h2"
                            align={"center"}
                            sx={{padding: "20px"}}
                            color={"secondary"}
                        >
                            Dodaj nowy temat
                        </Typography>
                        <TextField
                            type={"text"}
                            label={"Temat"}
                            variant={"outlined"}
                            sx={{margin: "15px", width: "95%"}}
                        />
                        <Button
                            color={"secondary"}
                            variant={"contained"}
                            size={"large"}
                            sx={{margin: "15px", width: "50%", padding: "10px", fontSize: "1rem"}}
                        >
                            Dodaj
                        </Button>
                    </Paper>
                </form>
            </Container>
        </>
    )
}

export default AddProject;
