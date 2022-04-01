import React, { useState } from "react";
import {useSendPasswordResetEmail} from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import {auth} from "../../../firebase";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
    );

    const reset = async (e) => {
        e.preventDefault();

        const errors = [];
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!email.match(regex)) {
            errors.push("Invalid email");
        }
        setErrors(errors);

        if (errors.length === 0) {
            sendPasswordResetEmail(email);
        }
    }

    return (
        <Container>
            <form>
                <Paper elevation={10}
                       sx={{margin: "50px 20px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography
                        variant="h4"
                        component="h2"
                        align={"center"}
                        sx={{padding: "20px"}}
                        color={"secondary"}
                    >
                        Reset your password
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
                    <Typography
                        variant="h6"
                        component="h2"
                        align={"center"}
                        sx={{padding: "20px"}}
                        color={"red"}
                    >
                        {error?.message}
                    </Typography>
                    <TextField
                        type={"text"}
                        label={"E-mail"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        variant={"outlined"}
                        sx={{margin: "15px", width: "95%"}}
                    />
                    <Button
                        color={"secondary"}
                        variant={"contained"}
                        size={"large"}
                        sx={{margin: "15px", width: "50%", padding: "10px", fontSize: "1rem"}}
                        onClick={reset}
                    >
                        Send
                    </Button>
                    <div style={{ margin: "30px 15px" }}>
                        <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
                            <Typography variant="body1" paragraph align="center">
                                Don't have an account? Register.
                            </Typography>
                        </Link>
                    </div>
                </Paper>
            </form>
        </Container>
    )
}

export default Reset;
