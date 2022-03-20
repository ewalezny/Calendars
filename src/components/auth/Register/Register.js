import React, { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../../../firebase";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    console.log(error?.message);

    const register = () => {
        if (!name) alert("Proszę podać imię");
        createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/addTask", { replace: true })
    }, [user, loading, navigate])

    return (
        <Container>
            <form>
                <Paper elevation={10}
                       sx={{margin: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography
                        variant="h4"
                        component="h2"
                        align={"center"}
                        sx={{padding: "20px"}}
                        color={"secondary"}
                    >
                        Register
                    </Typography>
                    <TextField
                        type={"text"}
                        label={"Name"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        variant={"outlined"}
                        sx={{margin: "15px", width: "95%"}}
                    />
                    <TextField
                        type={"text"}
                        label={"E-mail"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        variant={"outlined"}
                        sx={{margin: "15px", width: "95%"}}
                    />
                    <TextField
                        type={"password"}
                        label={"Password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        variant={"outlined"}
                        sx={{margin: "15px", width: "95%"}}
                    />
                    <Button
                        color={"secondary"}
                        variant={"contained"}
                        size={"large"}
                        sx={{margin: "15px", width: "50%", padding: "10px", fontSize: "1rem"}}
                        onClick={register}
                    >
                        Register
                    </Button>
                    <div style={{ margin: "15px" }}>
                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <Typography variant="body1" paragraph align="center">
                                Already have an account? Log in.
                            </Typography>
                        </Link>
                    </div>
                </Paper>
            </form>
        </Container>
    )
}

export default Register;
