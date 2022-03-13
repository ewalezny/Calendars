import React, { useState } from "react";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";
import {AddCircleOutlineRounded} from "@mui/icons-material";
import Header from "../Header";
import { db } from "../../../firebase";
import {addDoc, collection, Timestamp} from "firebase/firestore";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "taskList"), {
                title,
                description,
                created: Timestamp.now()
            })
        } catch (err) {
            console.log(err)
        }
        setTitle("");
        setDescription("");
    }

    return (
        <>
            <Header />
            <Container>
                <form onSubmit={handleSubmit}>
                    <Paper elevation={4}
                           sx={{margin: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Typography
                            variant="h4"
                            component="h2"
                            align={"center"}
                            sx={{padding: "20px"}}
                            color={"secondary"}
                        >
                            Dodaj nowe zadanie
                        </Typography>
                        <TextField
                            type={"text"}
                            label={"Zadanie"}
                            variant={"outlined"}
                            sx={{margin: "15px", width: "95%"}}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <TextField
                            type={"text"}
                            label={"Opis"}
                            variant={"outlined"}
                            sx={{margin: "15px", width: "95%"}}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <Button
                            type="submit"
                            startIcon={<AddCircleOutlineRounded />}
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

export default AddTask;
