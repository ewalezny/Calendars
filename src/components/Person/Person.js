import React from 'react';
import { useParams } from "react-router-dom";

const Person = () => {
    const { id } = useParams();
    return (
        <h1>To jest user: {id}</h1>
    )
}

export default Person;
