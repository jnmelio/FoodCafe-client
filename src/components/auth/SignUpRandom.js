import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";

function SignUpRandom(props) {
  // const [randomRecipe, updateRandomRecipe] = useState([]);
  // const [randomUser, updateRandomUser] = useState([]);
  // const [newFriend, updateNewFriend] = useState([]);
  // const [friend, updateFriend] = useState(null);
  // const [recipe, updateRecipe] = useState(null);
  const { user, onHandleFriend, randomUser, friend, updateUser, onHandleRecipe, recipe, randomRecipe } = props;

  // useEffect(() => {
  //   axios
  //     .get(`${config.API_URL}/api/signup`, { withCredentials: true })
  //     .then((response) => {
  //       console.log(response.data);
  //       updateRandomRecipe(response.data.randomRecipe);
  //       updateRandomUser(response.data.randomUser);
  //     })
  //     .catch(() => {});
  // }, []);

  // const handleAddAFriend = () => {
  //   axios
  //     .post(
  //       `${config.API_URL}/api/addFriend/${randomUser._id}`,
  //       {},
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       updateNewFriend(response.data)
  //       updateFriend(true);
  //     })
  //     .catch(() => {});
  // };

  // const handleAddARecipe = () => {
  //   axios
  //     .post(
  //       `${config.API_URL}/api/addRecipe/${randomRecipe._id}`,
  //       {},
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       updateRecipe(true);
  //       updateRandomRecipe(response.data);
  //     })
  //     .catch(() => {});
  // };

  return (
    <div>
      <div>
        <h1>Random</h1>

        {!recipe ? (
          <div>
            <h3>{randomRecipe.name}</h3>
            <button onClick={onHandleRecipe}>
              Add {randomRecipe.name} to your profile
            </button>
          </div>
        ) : (
          <p>You added {randomRecipe.name} to your profile</p>
        )}

        {!friend ? (
          <div>
            <h3>{randomUser.username}</h3>
            <button onClick={onHandleFriend}>
              Add {randomUser.username} as a friend
            </button>
          </div>
        ) : (
          <p>You added {randomUser.username} as a new friend</p>
        )}
      </div>
      <Link to="/timeline">Go to my profile</Link>
    </div>
  );
}

export default SignUpRandom;
