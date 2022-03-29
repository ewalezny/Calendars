import React, { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../../../firebase";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const [
        createUserWithEmailAndPassword,
        user,
        loading
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        const errors = [];
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (name.length < 2 || name.length > 15) {
            errors.push("Name needs to be between 2 and 15 characters");
        }
        if (!email.match(regex)) {
            errors.push("Invalid email");
        }
        if (password.length < 5 || password.length > 20) {
            errors.push("Password needs to be between 5 and 20 characters");
        }
        setErrors(errors);

        if (errors.length === 0) {
            createUserWithEmailAndPassword(email, password);
        }
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
                    <div style={{ margin: "30px 15px" }}>
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
