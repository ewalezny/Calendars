import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth, logInWithEmailAndPassword} from "../../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/addTask");
    }, [user, loading, navigate]);

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
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >
                        Log in
                    </Button>
                    <div style={{ margin: "15px" }}>
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