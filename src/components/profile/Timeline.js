import { Avatar, Button, IconButton, makeStyles, TextField } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

//TIMELINE COMES FROM THE ROUTE IN APP.JS AND THE LINK AFTER SIGNUP IS IN SIGNUPRANDOM.JS // AFTER LOGIN ITS A REDIRECTION IN APP.JS
function Timeline(props) {
  const classes = useStyles();
  const { recipes,updateUserRecipes  } = props;
  const [fetching, updateFetching] = useState(true);
  const [posts, updatePosts] = useState(null);
  const [user, updateUser,] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        const recipesArr = response.data.recipe.map(eachRecipe => eachRecipe._id)
        updateUserRecipes(recipesArr)
        return axios.get(`${config.API_URL}/api/posts`, { withCredentials: true })
      })
      .then((response) => {
        console.log(response.data)
        updatePosts(response.data.reverse());
        updateFetching(false);
        if (response.data[0].user) {
          props.history.push('/timeline')
        }

      })
      .catch(() => {
        console.log("Fetching failed");
      });
  }, [props.history, updateUserRecipes]);

  const handleAddPost = (e) => {
    e.preventDefault()
    console.log(e.target.imageUrl)
    if (e.target.imageUrl.files[0]) {
      let picture = e.target.imageUrl.files[0]
      let formData = new FormData()
      formData.append('imageUrl', picture)
      axios.post(`${config.API_URL}/api/upload`, formData)
        .then((response) => {
          let recipe = e.target.recipe.value === 'default' ? null : e.target.recipe.value
          return axios.post(
            `${config.API_URL}/api/new-post`,
            {
              user: user._id,
              picture: response.data.picture,
              description: e.target.description.value,
              recipe,
            },
            { withCredentials: true }
          );
        })
        .then((result) => {
          console.log(result.data)
          updatePosts([result.data, ...posts])
          props.history.push('/')
          props.history.push('/timeline')
        })
        .catch((err) => {
          console.log(err)
        });
    } else {
      let recipe = e.target.recipe.value === 'default' ? null : e.target.recipe.value
      axios.post(`${config.API_URL}/api/new-post`,
        {
          user: user._id,
          picture: null,
          description: e.target.description.value,
          recipe,
        },
        { withCredentials: true }
      )
        .then((result) => {
          updatePosts([result.data, ...posts])
          props.history.push('/')
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
    <div>
 <Link to='/'><img src="/logo-without-background.png" class="logo"></img></Link>
    <div className=' container'>
      <h1>WELCOME {user.username}</h1>

      <form className='forms' onSubmit={handleAddPost}>
        <TextField id="outlined-primary" label="Post Something"
          variant="outlined" name='description' type='text' ></TextField>

        <input name="imageUrl" accept="image/png, image/jpeg" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton><Button type='submit'>Post</Button>
        </label>
        <br />
        <select name='recipe'>
          <option value="default" selected >Choose one of your recipes</option>
          {recipes.map((rec) => {
            return <option key={rec._id} value={rec._id}>{rec.name}</option>
          })}
        </select>
      </form>

      {
        posts.map((post) => {
          return (
            <div key={post._id} className='post '>
              <Avatar key={post._id} /><b>{post.user.username}</b> <p>{post.description}</p><br />
              {post.picture && <img src={post.picture} alt='recipe.png' />}

              {post.recipe ?
                (post.recipe &&
                  <p id='recipe-link' >I used:<Link key={post.recipe._id}
                    to={`/recipe-details/${post.recipe._id}`}>
                    <b>{' >> '}{post.recipe.name}{' << '}</b></Link> recipe</p>) : (<p>Find you recipe:
                      <Link to="/recipes"><b>{' >> '}Recipes{' << '}</b></Link></p>)
              }
            </div>
          );
        })
      }
      <h3>My Friends</h3>
      {
        user.myFriends.map((singleFriend) => {
          return (
            <div key={singleFriend._id}>
              <p>{singleFriend.username}</p>
            </div>
          );
        })
      }<h3>My Recipes</h3>
      {
        user.recipe.map((singleRecipe) => {
          return (
            <div>

              <p>{singleRecipe.name}</p>
            </div>
          );
        })
      }
      <Link to='/users'>Access all users</Link>
    </div >
    </div>
   
  );
}

export default Timeline;