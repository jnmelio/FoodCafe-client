import axios from "axios";
import React, { Component } from "react";
import config from "../../config";

class UserList extends Component {
  handleChatClick = (chatUserId) => {
    const { user} = this.props;
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

  render() {
    const { users, user, onAddaFriend,fetching, updateFetching } = this.props;
    let newFriend = []
    user.myFriends.map((friend)=>{
        newFriend.push(friend)
    })
    console.log('newFriend', newFriend);
    // remove yourself if you're signed in
    let allUsers = users;
    if (user) {
      allUsers = users.filter((u) => u._id !== user._id);
    }

    return (
      <div>
        {allUsers.map((singleUser) => {
          if (newFriend.includes(singleUser._id)) {
            return (
              <div>
                <p>{singleUser.username}</p>
                <button
                  onClick={() => {
                    this.handleChatClick(singleUser._id);
                  }}
                >
                  Chat
                </button>
              </div>
            );
          } else {
          return (
            <div>
              <p>{singleUser.username}</p>
              <button
                onClick={() => {
                  onAddaFriend(singleUser);
                }}
              >
                Add this user as a friend
              </button>
            </div>
          );
          }

        })}
      </div>
    );
  }
}

export default UserList;
