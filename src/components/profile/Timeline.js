import { Avatar, Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config";


//TIMELINE COMES FROM THE ROUTE IN APP.JS AND THE LINK AFTER SIGNUP IS IN SIGNUPRANDOM.JS // AFTER LOGIN ITS A REDIRECTION IN APP.JS
function Timeline(props) {
  const { user, updateUser } = props;
  const [fetching, updateFetching] = useState(true);
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        return axios.get(`${config.API_URL}/api/posts`, { withCredentials: true })
      })
      .then((response) => {
        updatePosts(response.data.reverse());
        updateFetching(false);
      })
      .catch(() => {
        console.log("Fetching failed");
      });
  }, [updateUser]);

  const handleAddPost = (e) => {
    e.preventDefault()
    if (e.target.imageUrl.files[0]) {
      let picture = e.target.imageUrl.files[0]
      let formData = new FormData()
      formData.append('imageUrl', picture)
      axios.post(`${config.API_URL}/api/upload`, formData)
        .then((response) => {
          return axios.post(
            `${config.API_URL}/api/new-post`,
            {
              user: user._id,
              picture: response.data.picture,
              description: e.target.description.value,
              recipe: e.target.recipe.value
            },
            { withCredentials: true }
          );
        })
        .then((result) => {
          console.log(result.data)
          updatePosts([result.data, ...posts])
          props.history.push('/timeline')
        })
        .catch((err) => {
          console.log(err)
        });
    } else {
      axios.post(`${config.API_URL}/api/new-post`,
        {
          user: user._id,
          picture: 'https://res.cloudinary.com/silsin/image/upload/v1621247551/t2uj6bnbt6egkkkah874.png',
          description: e.target.description.value,
          recipe: e.target.recipe.value
        },
        { withCredentials: true }
      )
        .then((result) => {
          updatePosts([result.data, ...posts])
          props.history.push('/timeline')
        })
        .catch((err) => {
          console.log(err)
        });
    }

  };

  if (fetching) {
    return <p>Loading . . .</p>;
  }

  return (
    <div className='container'>
      <h1>Timeline</h1>
      <p> WELCOME {user.username}</p>
      <form onSubmit={handleAddPost}>
        <TextField id="outlined-basic" label="Post Something" variant="outlined" name='description' type='text' ></TextField>
        <input type="file" name="imageUrl" accept="image/png, image/jpg" /><br />
        <select name='recipe'>
          {user.recipe.map((rec) => {
            return <option value={rec._id}>{rec.name}</option>
          })}
        </select>
        <Button type='submit'>Post</Button>
      </form>
      {
        posts.map((post) => {
          return (
            <div> {console.log(post.createdAt)}
              <Avatar />{post.user.username}<br />
              <img style={{ height: '150px' }} src={post.picture} alt='recipe.png' />
              <p>{post.description}</p>
              {
                post.recipe &&
                <p>check out this recipe: <Link key={post.recipe._id} to={`/recipe-details/${post.recipe._id}`}>
                  <h3>{post.recipe.name}</h3>
                </Link></p>

              }
            </div>
          );
        })
      }
      <h3>My Friends</h3>
      {
        user.myFriends.map((singleFriend) => {
          return (
            <div>
              <p>{singleFriend.username}</p>
            </div>
          );
        })
      }
      {
        user.recipe.map((singleRecipe) => {
          return (
            <div>
              <h3>My Recipes</h3>
              <p>{singleRecipe.name}</p>
            </div>
          );
        })
      }
      <Link to='/users'>Access all users</Link>
    </div >
  );
}

export default Timeline;
