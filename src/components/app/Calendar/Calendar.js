import React, {useEffect, useState} from "react";
import Header from "../Header";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../../firebase";
import {format, getDay, parse, startOfWeek} from "date-fns";
import pl from "date-fns/locale/pl";
import {Container} from "@mui/material";

require('react-big-calendar/lib/css/react-big-calendar.css');

const Calendars = () => {
    const locales = pl;
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    });
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
            <Container maxWidth="xl">
                <Calendar
                    events={taskList.map(task => {
                        return {
                            title: task.data.title,
                            start: new Date(task.data.start),
                            end: new Date(task.data.end),
                            allDay: task.data.allDay
                        }
                    })}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 500, margin: 50}}
                />
            </Container>
        </>
    )
}

export default Calendars;
