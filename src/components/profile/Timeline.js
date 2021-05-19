import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

//TIMELINE COMES FROM THE ROUTE IN APP.JS AND THE LINK AFTER SIGNUP IS IN SIGNUPRANDOM.JS // AFTER LOGIN ITS A REDIRECTION IN APP.JS
function Timeline(props) {
  const classes = useStyles();
  const { user, updateUser, recipes } = props;
  const [fetching, updateFetching] = useState(true);
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        updateFetching(false)
        axios.get(`${config.API_URL}/api/posts`, {
          withCredentials: true,
        });
      })
      .then((response) => {
        updatePosts(response.data.reverse());
        if (response.data[0].user) {
          updateFetching(false);
          props.history.push("/timeline");
        }
      })
      .catch(() => {
        console.log("Fetching failed");
      });
  }, []);

  const handleAddPost = (e) => {
    e.preventDefault();

    if (e.target.imageUrl) {
      let picture = e.target.imageUrl.files[0];
      let formData = new FormData();
      formData.append("imageUrl", picture);
      axios
        .post(`${config.API_URL}/api/upload`, formData)
        .then((response) => {
          return axios.post(
            `${config.API_URL}/api/new-post`,
            {
              user: user._id,
              picture: response.data.picture,
              description: e.target.description.value,
              recipe: e.target.recipe.value,
            },
            { withCredentials: true }
          );
        })
        .then((result) => {
          console.log(result.data);
          updatePosts([result.data, ...posts]);
          props.history.push("/");
          props.history.push("/timeline");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          `${config.API_URL}/api/new-post`,
          {
            user: user._id,
            picture: null,
            description: e.target.description.value,
            recipe: e.target.recipe.value,
          },
          { withCredentials: true }
        )
        .then((result) => {
          updatePosts([result.data, ...posts]);
          props.history.push("/");
          props.history.push("/timeline");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (fetching) {
    return <p>Loading . . .</p>;
  }
  console.log("posts", posts[0]);
  return (
    <div className=" container">
      <h1>Timeline</h1>
      <p> WELCOME {user.username}</p>
      <form className="forms" onSubmit={handleAddPost}>
        <TextField
          id="outlined-primary"
          label="Post Something"
          variant="outlined"
          name="description"
          type="text"
        ></TextField>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
          <Button type="submit">Post</Button>
        </label>
        <br />
        <select name="recipe">
          <option selected value="609d02193f52c6553c206e8c">
            Choose one of your recipes
          </option>
          {recipes.map((rec) => {
            return (
              <option key={rec._id} value={rec._id}>
                {rec.name}
              </option>
            );
          })}
        </select>
      </form>

      {posts.map((post) => {
        return (
          <div key={post._id} className="post ">
            <Avatar key={post._id} />
            <b>{post.user.username}</b> <p>{post.description}</p>
            <br />
            {post.picture && <img src={post.picture} alt="recipe.png" />}
            {post.recipe._id !== "60a3b6910eb94921a4a7bd14" ? (
              post.recipe && (
                <p id="recipe-link">
                  check out this recipe:
                  <Link
                    key={post.recipe._id}
                    to={`/recipe-details/${post.recipe._id}`}
                  >
                    <h3>{post.recipe.name}</h3>
                  </Link>
                </p>
              )
            ) : (
              <p>
                find your recipe here{" "}
                <Link to="/recipes">
                  <b>Recipes</b>
                </Link>
              </p>
            )}
          </div>
        );
      })}
      <h3>My Friends</h3>
      {user.myFriends.map((singleFriend) => {
        return (
          <div key={singleFriend._id}>
            <p>{singleFriend.username}</p>
          </div>
        );
      })}
      <h3>My Recipes</h3>
      {user.recipe.map((singleRecipe) => {
        return (
          <div>
            <p>{singleRecipe.name}</p>
          </div>
        );
      })}
      <Link to="/userList">Access all users</Link>
    </div>
  );
}

export default Timeline;
