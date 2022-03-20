import React, {useEffect, useState} from "react";
import Header from "../Header";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../../firebase";
import {format, getDay, parse, startOfWeek} from "date-fns";
import pl from "date-fns/locale/pl";
import {Container} from "@mui/material";
import ShowTask from "../ShowTask";

require('react-big-calendar/lib/css/react-big-calendar.css');

const Calendars = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const locales = pl;
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    });
    const [taskList, setTaskList] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const taskColRef = query(collection(db, "taskList"), orderBy("created", "desc"))
        onSnapshot(taskColRef, (snapshot) => {
            setTaskList(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const handleSelect = e => {
        setShow(true);
        setTitle(e.title);
        setDescription(e.description);
    }

    return (
        <>
            <Header/>
            <Container maxWidth="xl">
                <Calendar
                    events={taskList.map(task => {
                        return {
                            title: task.data.title,
                            description: task.data.description,
                            start: new Date(task.data.start),
                            end: new Date(task.data.end),
                            allDay: task.data.allDay
                        }
                    })}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    resizable
                    onSelectEvent={handleSelect}
                    style={{height: 500, margin: 50}}
                />
                {show && <ShowTask
                    onClose={handleClose}
                    open={show}
                    title={title}
                    description={description}
                />}
            </Container>
        </>
    )
}

export default Calendars;
