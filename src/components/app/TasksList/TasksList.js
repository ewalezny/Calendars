import React, {useState, useEffect} from "react";
import {db} from "../../../firebase";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import Header from "../Header";
import Task from "../Task";
import {Container, Paper, Typography} from "@mui/material";

const TasksList = () => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const taskColRef = query(collection(db, "taskList"), orderBy("created", "desc"))
        onSnapshot(taskColRef, (snapshot) => {
            setTaskList(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    return (
        <>
            <Header/>
            <Container>
                <Paper elevation={4}
                       sx={{margin: "50px 20px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography
                        variant="h4"
                        component="h2"
                        align={"center"}
                        sx={{padding: "20px"}}
                        color={"secondary"}
                    >
                        Tasks list
                    </Typography>
                    <ul style={{width: "95%", marginLeft: "-40px"}}>
                        {taskList.map(task => (
                            <Task
                                id={task.id}
                                key={task.id}
                                title={task.data.title}
                                description={task.data.description}
                            />
                        ))}
                    </ul>
                </Paper>
            </Container>
        </>
    )
}

export default TasksList;
