import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

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

  const classes = useStyles();
  return (
    <div>
      <div>
        <div>
          <Link to="/">
            <img src="/logo-without-background.png" class="logo"></img>
          </Link>
        </div>
        <div className="randomSign">
          {!recipe ? (
            <div>
              <h3 className="signupElement">{randomRecipe.name}</h3>
              <Button variant="contained" onClick={onHandleRecipe}>
                Add {randomRecipe.name} to your profile
              </Button>
            </div>
          ) : (
            <p>You added {randomRecipe.name} to your profile</p>
          )}

          {!friend ? (
            <div>
              <h3 className="signupElement">{randomUser.username}</h3>
              <Button variant="contained" onClick={onHandleFriend}>
                Add {randomUser.username} as a friend
              </Button>
            </div>
          ) : (
            <p>You added {randomUser.username} as a new friend</p>
          )}
          <div className="buttonProfile">
            <Button variant="contained" color="primary">
              <Link to="/timeline">Discover your timeline</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpRandom;
