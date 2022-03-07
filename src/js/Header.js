import React, {useState} from "react";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";

const teamMembers = ["Person1", "Person2", "Person3", "Person4", "Person5"]

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = e => {
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
                            <MenuItem key={"kierownik"} component={NavLink} to={'/'}>
                                <Typography>Panel kierownika</Typography>
                            </MenuItem>
                            {teamMembers.map((member, i) => (
                                <MenuItem key={i} component={NavLink} to={`/person${i+1}`}>
                                    <Typography>{member}</Typography>
                                </MenuItem>
                            ))}
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
                            key={"kierownik"}
                            component={NavLink}
                            to={'/'}
                            sx={{color: "white", diplay: "block" }}
                        >
                            Panel<br />kierownika
                        </Button>
                        {teamMembers.map((member, i) => (
                            <Button
                                key={i}
                                component={NavLink}
                                to={`/person${i+1}`}
                                sx={{color: "white", diplay: "block", paddingLeft: "20px" }}
                            >
                                {member}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
