import React from "react";
import {Dialog, DialogContent, Typography} from "@mui/material";

const ShowTask = ({open, onClose, title, description, id}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography
                    variant="h4"
                    component="h2"
                    align={"center"}
                    sx={{padding: "10px"}}
                    color={"secondary"}
                >
                    Task
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    align={"center"}
                    sx={{padding: "10px"}}
                    color={"black"}
                >
                    Title: {title}
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    align={"center"}
                    sx={{padding: "10px"}}
                    color={"black"}
                >
                    Description: {description}
                </Typography>
            </DialogContent>
        </Dialog>
    )
}

export default ShowTask;
