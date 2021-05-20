import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import config from "../../config";
import { Avatar, Button } from "@material-ui/core";

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

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
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
    const { users, user, onAddaFriend } = this.props;
    let newFriend = [];
    // eslint-disable-next-line array-callback-return
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
          <img src="/logo-without-background.png" class="logo" alt='logo'></img>
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
