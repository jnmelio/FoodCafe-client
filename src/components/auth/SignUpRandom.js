import React from "react";
import { Link } from "react-router-dom";



//SIGNUP RANDOM COMES FROM THE ROUTE IN APP.JS
function SignUpRandom(props) {
  const {
    onHandleFriend,
    randomUser,
    friend,
    onHandleRecipe,
    recipe,
    randomRecipe,
  } = props;


  return (
    <div>
      <div>
      <div>
        <Link to='/'><img src="/logo-without-background.png" class="logo"></img></Link>
      </div>

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

        {!friend? (
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
