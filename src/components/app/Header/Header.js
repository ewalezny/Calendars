import React, {useState, useEffect} from "react";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";
import {AccountCircle} from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserName = async() => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/');
        fetchUserName();
    }, [user, loading, fetchUserName, navigate]);

    const handleOpenNavMenu = e => {
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleOpenUserMenu = e => {
        setAnchorElUser(e.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{display: {xs: "none", md: "flex"}}}
                    >
                        CALENDARS
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: "block", md: "none"}}}
                        >
                            <MenuItem key={"addTask"} component={NavLink} to={'/addTask'} onClick={handleCloseNavMenu}>
                                <Typography>Add task</Typography>
                            </MenuItem>
                            <MenuItem key={"tasksList"} component={NavLink} to={'/tasksList'} onClick={handleCloseNavMenu}>
                                <Typography>Tasks list</Typography>
                            </MenuItem>
                            <MenuItem key={"calendar"} component={NavLink} to={'/calendar'} onClick={handleCloseNavMenu}>
                                <Typography>Calendar</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}
                    >
                        CALENDARS
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}, justifyContent: "flex-end"}}>
                        <Button
                            key={"addTask"}
                            component={NavLink}
                            to={'/addTask'}
                            sx={{color: "white", display: "block" }}
                        >
                            Add task
                        </Button>
                        <Button
                            key={"tasksList"}
                            component={NavLink}
                            to={'/tasksList'}
                            sx={{color: "white", display: "block", marginLeft: "10px" }}
                        >
                            Tasks list
                        </Button>
                        <Button
                            key={"calendar"}
                            component={NavLink}
                            to={'/calendar'}
                            sx={{color: "white", display: "block", marginLeft: "10px" }}
                        >
                            Calendar
                        </Button>
                    </Box>
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={handleOpenUserMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem key="LogOut" onClick={logout}>
                            <Typography textAlign="center">Log out</Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
