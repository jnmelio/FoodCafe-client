import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, GridList, GridListTile, TextField } from '@material-ui/core';
import { AccountCircle, AccountCircleOutlined, FastfoodSharp, Home, HomeRounded, People, Settings } from '@material-ui/icons';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function Profile(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [myrecipe, updateMyRecipe] = useState(false)
    const { user, onLogout, onSignUp, error, onLogIn, recipes } = props;
    console.log(props)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleRecipe = () => {
        console.log('changing to true', user.recipe)
        updateMyRecipe(true)
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon /></IconButton>
                    <AccountCircleOutlined /> <h3> {user.firstName} {user.lastName}</h3>({user.usertype})
                    <Link to={'/'} >
                        <ListItemIcon> <HomeRounded />  </ListItemIcon>
                        <ListItemText primary='Home' />
                    </Link>


                    <Typography variant="h6" noWrap>

                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button >
                        <ListItemIcon> <People />  </ListItemIcon>
                        <ListItemText primary='Friends' />
                    </ListItem>
                    <Divider />
                    <ListItem button >
                        <ListItemIcon> <FastfoodSharp />  </ListItemIcon>
                        <ListItemText onClick={handleRecipe} primary='Recipes' />
                    </ListItem>
                    <Divider />
                    <ListItem button >
                        <ListItemIcon> <Settings />  </ListItemIcon>
                        <ListItemText primary='Settings' />
                    </ListItem>

                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                <div className={classes.drawerHeader} />
                {myrecipe ? (<section style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {user.recipe.map((recipe) => {
                        return <div style={{ maxWidth: '300px', margin: '20px', border: 'solid', padding: '20px' }} >
                            <div >
                                <h3>{recipe.name}</h3>
                                <img style={{ maxWidth: '260px' }}
                                    alt={recipe.name} src={recipe.picture} />
                                <p>{recipe.description}</p>

                            </div>
                        </div>
                    })
                    }
                </section>) : <p>Hello</p>}

            </main>
            <aside >
                <List >
                    <ListItem>
                        Friend list
                </ListItem>
                    <ListItem>
                        Friend
                </ListItem>
                    <ListItem>
                        Friend
                </ListItem>
                    <ListItem>
                        Friend
                </ListItem>
                </List>
            </aside>
        </div >
    );
}
