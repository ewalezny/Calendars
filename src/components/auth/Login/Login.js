import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {app} from "../../../firebase";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";
import {getAuth} from "firebase/auth";

const auth = getAuth(app);

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [
        signInWithEmailAndPassword,
        user,
        loading
    ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/addTask");
    }, [user, loading, navigate]);

    const login = async (e) => {
        e.preventDefault();

        const errors = [];
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!email.match(regex)) {
            errors.push("Invalid email");
        }
        if (password.length < 5 || password.length > 20) {
            errors.push("Password needs to be between 5 and 20 characters");
        }
        setErrors(errors);

        if (errors.length === 0) {
            signInWithEmailAndPassword(email, password);
        }
    }

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
                        Log in
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
                        onClick={login}
                    >
                        Log in
                    </Button>
                    <div style={{ margin: "30px 15px" }}>
                        <Link to="/reset" style={{ textDecoration: "none", color: "black" }}>
                            <Typography variant="body1" paragraph align="center">
                                Forgot password?
                            </Typography>
                        </Link>
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

export default Login;