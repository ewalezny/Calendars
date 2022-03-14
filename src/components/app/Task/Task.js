import React, {useState} from "react";
import {IconButton, Paper, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTask from "../EditTask";
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const Task = ({id, title, description}) => {
    const [edit, setEdit] = useState(false);

    const handleClose = () => {
        setEdit(false);
    }

    const handleDelete = async () => {
        const taskDocRef = doc(db, "taskList", id)
        try {
            await deleteDoc(taskDocRef)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Paper elevation={4}
               sx={{margin: "20px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{padding: "15px"}}
                    color={"secondary"}
                >
                    Name: {title}
                </Typography>
                <Typography
                    variant="p"
                    component="h2"
                    sx={{padding: "15px", fontWeight: "normal"}}
                >
                    Description: {description}
                </Typography>
            </div>
            <div style={{margin: "15px"}}>
                <IconButton onClick={() => setEdit(true)} color={"secondary"}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={handleDelete} color={"secondary"}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            {edit && <EditTask
                onClose={handleClose}
                toEditTitle={title}
                toEditDescription={description}
                open={edit}
                id={id}
            />}
        </Paper>
    )
}

export default Task;
