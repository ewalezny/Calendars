import React, {useState} from "react";
import {Button, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import {AddCircleOutlineRounded} from "@mui/icons-material";
import Header from "../Header";
import {db} from "../../../firebase";
import {addDoc, collection, Timestamp} from "firebase/firestore";
import DateAdapter from '@mui/lab/AdapterDateFns';
import {DateTimePicker, LocalizationProvider} from "@mui/lab";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState(Date.now());
    const [end, setEnd] = useState(Date.now());

    const handleChangeStart = newStart => {
        setStart(newStart.getTime());
    }

    const handleChangeEnd = newEnd => {
        setEnd(newEnd.getTime());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "taskList"), {
                title,
                description,
                created: Timestamp.now(),
                start,
                end,
                allDay: false
            })
        } catch (err) {
            console.log(err)
        }
        setTitle("");
        setDescription("");
        setStart(Date.now());
        setEnd(Date.now());
    }

    return (
        <>
            <Header/>
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
                            Add new task
                        </Typography>
                        <TextField
                            type={"text"}
                            label={"Task name"}
                            variant={"outlined"}
                            sx={{margin: "15px", width: "95%"}}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <TextField
                            type={"text"}
                            label={"Task description"}
                            variant={"outlined"}
                            sx={{margin: "15px", width: "95%", marginBottom: "30px"}}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <Stack spacing={4}>
                                <DateTimePicker
                                    label="Start date"
                                    ampm={false}
                                    onChange={handleChangeStart}
                                    value={start}
                                    renderInput={(params) => <TextField {...params} />}
                                 />
                                <DateTimePicker
                                    label="End date"
                                    ampm={false}
                                    onChange={handleChangeEnd}
                                    value={end}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                        <Button
                            type="submit"
                            startIcon={<AddCircleOutlineRounded/>}
                            color={"secondary"}
                            variant={"contained"}
                            size={"large"}
                            sx={{margin: "30px", width: "50%", padding: "10px", fontSize: "1rem"}}
                        >
                            Add
                        </Button>
                    </Paper>
                </form>
            </Container>
        </>
    )
}

export default AddTask;
