/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import config from "../../config";

function Users(props) {
  const { allUsers, onAddaFriend } = props;


  return (
    <div>
      {
        allUsers.map((singleUser) => {
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
        })
      }
    </div>
  );
}

export default Users;
