import React, { useEffect, useState } from 'react';
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
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import { Avatar, Button, Card, CardActions, CardContent, CardMedia, GridList, GridListTile, TextField } from '@material-ui/core';
import { AccountCircleOutlined, FastfoodSharp, HomeRounded, People, Settings } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'
import { Avatar, Button, ButtonBase } from '@material-ui/core';
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
    const [user, updateUser,] = useState(null);
    const [myrecipe, updateMyRecipe] = useState(false)
    const [friends, updateMyFriends] = useState(false)
    const [fetching, updateFetching] = useState(true);
    const [posts, updatePosts] = useState(null);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleChatClick = (chatUserId) => {
        const { user, onAddaFriend } = props;
        if (!user) {
            props.history.push("/signin");
        } else {
            let data = {
                participants: [chatUserId, user._id],
            };
            axios
                .post(`${config.API_URL}/api/conversation`, data, {
                    withCredentials: true,
                })
                .then((response) => {
                    props.history.push(`/chat/${response.data._id}`);
                });
        }
    };

    useEffect(() => {
        axios
            .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
            .then((response) => {
                updateUser(response.data);
                updateMyFriends(response.data.myFriends)
                return axios.get(`${config.API_URL}/api/posts`, { withCredentials: true })
            })
            .then((response) => {
                updatePosts(response.data.reverse());
                updateFetching(false);
            })
            .catch(() => {
                console.log("Fetching failed");
            });
    }, [updateUser]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (fetching) {
        return <p>Loading . . .</p>;
    }
    return (
        <div>
            <div id='profileInfo'>
                <img className='profilePicture' src={user.picture} alt={user.username}></img>
                <div> <h3>{user.firstName} {user.lastName}</h3><br /><p>e-mail address : {user.email} </p></div>
            </div>
            <div className='container'>
                <h3>My Posts</h3>
                {
                    posts.map((post) => {
                        return (
                            post?.user?._id === user._id &&
                            <div key={post?._id} className='post'>
                                <span></span><b><Avatar />{post.user.username}</b> <p>{post.description}</p><br />
                                {post.picture && <img src={post.picture} alt='recipe.png' />}

                                {post.recipe ?
                                    (post.recipe &&
                                        <p id='recipe-link' >I used:<Link key={post.recipe._id}
                                            to={`/recipe-details/${post.recipe._id}`}>
                                            <b>{' >> '}{post.recipe.name}{' << '}</b></Link> recipe</p>) : (<p>Find you recipe:
                                                <Link to="/recipes"><b>{' >> '}Recipes{' << '}</b></Link></p>)
                                } </div>
                        );
                    })
                    }
        </div>
        </div>
    );
}