import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import config from "../../config";


//TIMELINE COMES FROM THE ROUTE IN APP.JS AND THE LINK AFTER SIGNUP IS IN SIGNUPRANDOM.JS // AFTER LOGIN ITS A REDIRECTION IN APP.JS
function Timeline(props) {
  const { user, updateUser, recipes, updateRecipes } = props;
  const [fetching, updateFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        updateFetching(false);
      })
      .catch(() => {
        console.log("Fetching failed");
      });
  }, []);

  if (fetching) {
    return <p>Loading . . .</p>;
  }

  return (
    <div>
      <h1>Timeline</h1>
      <p>{user.username}</p>
      {user.myFriends.map((singleFriend) => {
        return (
          <div>
            <h3>My Friends</h3>
            <p>{singleFriend.username}</p>
          </div>
        );
      })}
      {user.recipe.map((singleRecipe) => {
        return (
          <div>
            <h3>My Recipes</h3>
            <p>{singleRecipe.name}</p>
          </div>
        );
      })}
      <Link to='/users'>Access all users</Link>
    </div>
  );
}

export default Timeline;
