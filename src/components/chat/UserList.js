import axios from "axios";
import React, { Component } from "react";
import {Link} from 'react-router-dom'
import config from "../../config";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import { Avatar, Button, Card, CardActions, CardContent, CardMedia, GridList, GridListTile, TextField } from '@material-ui/core';
import {
  AccountCircleOutlined,
  FastfoodSharp,
  HomeRounded,
  People,
  Settings,
} from "@material-ui/icons";
import { Avatar, Button, ButtonBase } from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
class UserList extends Component {
  handleChatClick = (chatUserId) => {
    const { user } = this.props;
    if (!user) {
      this.props.history.push("/signin");
    } else {
      let data = {
        participants: [chatUserId, user._id],
      };
      axios
        .post(`${config.API_URL}/api/conversation`, data, {
          withCredentials: true,
        })
        .then((response) => {
          this.props.history.push(`/chat/${response.data._id}`);
        });
    }
  };

  componentDidUpdate(prevProps){
    if(prevProps.user !== this.props.user){
      console.log(prevProps.user.myFriends.length, this.props.user.myFriends.length, 'LENGTH')
    }
  }

  // handleDelete = (someUser) => {
  //   const { user } = this.props;
  //   let filteredFriends = user.myFriends.filter((singleFriend)=>{
  //     return singleFriend._id !== someUser
  //   })

  // }

  render() {
    const { users, user, onAddaFriend, fetching, updateFetching } = this.props;
    let newFriend = [];
    user.myFriends.map((friend) => {
      newFriend.push(friend);
    });
    console.log("newFriend", newFriend);
    // remove yourself if you're signed in
    let allUsers = users;
    if (user) {
      allUsers = users.filter((u) => u._id !== user._id);
    }
    console.log(allUsers);
    return (
      <div>
        <Link to="/">
          <img src="/logo-without-background.png" class="logo"></img>
        </Link>
        <div>
          {" "}
          <main className="allRecipes">
            {allUsers.map((singleUser) => {
              console.log("singleuser", singleUser);
              if (newFriend.includes(singleUser._id)) {
                return (
                  <div className="recipeCard ">
                    {singleUser.username == null ? (
                      <div>
                        <Avatar /> <h3> {singleUser.firstName} </h3>{" "}
                      </div>
                    ) : (
                      <div>
                        <Avatar /> <h3> {singleUser.username} </h3>{" "}
                      </div>
                    )}
                    <Button
                      style={{ background: "lightgreen" }}
                      onClick={() => {
                        this.handleChatClick(singleUser._id);
                      }}
                    >
                      Chat
                    </Button>
                    <Button
                      style={{ background: "#EF7A90" }}
                      onClick={() => {
                        this.handleDelete(singleUser._id);
                      }}
                    >
                      Delete this friend
                    </Button>
                  </div>
                );
              } else {
                return (
                  <div className="recipeCard ">
                    {" "}
                    {singleUser.username == null ? (
                      <div>
                        <Avatar /> <h3> {singleUser.firstName} </h3>{" "}
                      </div>
                    ) : (
                      <div>
                        <Avatar /> <h3> {singleUser.username} </h3>{" "}
                      </div>
                    )}
                    <Button
                      style={{ background: "lightblue" }}
                      onClick={() => {
                        onAddaFriend(singleUser);
                      }}
                    >
                      Add this user as a friend
                    </Button>
                  </div>
                );
              }
            })}{" "}
          </main>
        </div>
      </div>
    );
  }
}

export default UserList;
