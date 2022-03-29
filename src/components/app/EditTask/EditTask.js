import React, {useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {Button, Dialog, DialogContent, Stack, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";

const EditTask = ({open, onClose, toEditTitle, toEditDescription, id}) => {
    const [title, setTitle] = useState(toEditTitle);
    const [description, setDescription] = useState(toEditDescription);
    const [start, setStart] = useState(Date.now());
    const [end, setEnd] = useState(Date.now());
    const [errors, setErrors] = useState([]);

    const handleChangeStart = newStart => {
        setStart(newStart.getTime());
    }

    const handleChangeEnd = newEnd => {
        setEnd(newEnd.getTime());
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        const errors = [];

        if (title.length < 3 || title.length > 30) {
            errors.push("Task title needs to be between 3 and 30 characters");
        }
        if (description.length < 3 || title.length > 50) {
            errors.push("Task description needs to be between 3 and 50 characters");
        }
        if (end <= start) {
            errors.push("It's not a time machine! End date should be later than start date.");
        }
        setErrors(errors);

        if (errors.length === 0) {
            const taskDocRef = doc(db, "taskList", id)
            try {
                await updateDoc(taskDocRef, {
                    title,
                    description,
                    start,
                    end,
                    allDay: false
                })
                onClose()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <form onSubmit={handleEdit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography
                        variant="h5"
                        component="h2"
                        align={"center"}
                        sx={{padding: "10px"}}
                        color={"secondary"}
                    >
                        Edit task
                    </Typography>
                    {errors && errors.map(err => (
                        <Typography
                            variant="h6"
                            component="h2"
                            align={"center"}
                            sx={{padding: "10px"}}
                            color={"red"}
                            key={err}
                        >
                            {err}
                        </Typography>
                    ))}
                    <TextField
                        type={"text"}
                        label={"Task name"}
                        sx={{margin: "15px", width: "100%"}}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        type={"text"}
                        label={"Task description"}
                        sx={{margin: "15px", marginBottom: "30px", width: "100%"}}
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
                        color={"secondary"}
                        variant={"contained"}
                        size={"large"}
                        sx={{margin: "15px", width: "50%", padding: "10px", fontSize: "1rem", marginTop: "30px"}}
                    >
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditTask;
