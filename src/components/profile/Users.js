/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

function Users(props) {
  const { allUsers, onAddaFriend } = props;


  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/alt-text*/}
      <Link to='/'><img src="/logo-without-background.png" class="logo"></img></Link>
      {
        allUsers.map((singleUser) => {
          return (
            <div>
              <p>{singleUser.username}</p>
              <button
                onClick={() => {
                  onAddaFriend(singleUser);
                }}>
                Add this user as a friend
            </button>
            </div>
          );
        })
      }
    </div>
  );
}

export default Users;
