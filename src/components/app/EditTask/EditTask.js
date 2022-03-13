import React, {useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {Button, Dialog, DialogContent, TextField, Typography} from "@mui/material";
import {AddCircleOutlineRounded} from "@mui/icons-material";

const EditTask = ({open, onClose, toEditTitle, toEditDescription, id}) => {
    const [title, setTitle] = useState(toEditTitle);
    const [description, setDescription] = useState(toEditDescription);

    const handleEdit = async (e) => {
        e.preventDefault();
        const taskDocRef = doc(db, "taskList", id)
        try {
            await updateDoc(taskDocRef, {
                title,
                description
            })
            onClose()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <form onSubmit={handleEdit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography
                        variant="h6"
                        component="h2"
                        align={"center"}
                        sx={{padding: "10px"}}
                        color={"secondary"}
                    >
                        Edycja
                    </Typography>
                    <TextField
                        type={"text"}
                        label={"Zadanie"}
                        sx={{margin: "15px"}}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        type={"text"}
                        label={"Opis"}
                        sx={{margin: "15px"}}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Button
                        type="submit"
                        color={"secondary"}
                        variant={"contained"}
                        size={"large"}
                        sx={{margin: "15px", width: "50%", padding: "10px", fontSize: "1rem"}}
                    >
                        Zapisz
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditTask;
