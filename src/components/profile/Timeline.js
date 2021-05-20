import { Avatar, Button, CssBaseline, Divider, IconButton, List, makeStyles, TextField, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
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
    <div className=' allRecipes'>
    <Link to='/'><img src="/logo-without-background.png" class="logo"></img></Link>
      <div className='container'>
        <CssBaseline />
        <h1>WELCOME {user.username}</h1>


        {/*form for posts */}
        <form className='forms' onSubmit={handleAddPost}>
          <TextField style={{ width: '30em' }} id="outlined-primary" label="Post Something" multiple={true}
            rows={4} multiline variant="outlined" name='description' type='text' ></TextField>

          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton><Button type='submit'>Post</Button>
          </label>
          <br />
          <br />
          <select name='recipe'>
            <option value="default" selected >Choose one of your recipes</option>
            {recipes.map((rec) => {
              return <option key={rec._id} value={rec._id}>{rec.name}</option>
            })}
          </select>
        </form>



        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
            {
              posts.map((post) => {
                return (

                  <div key={post._id} className='post '>
                    {  console.log(post.user.picture)}
                    {post.user.picture ? (<span className='picandname'><span><img className='postpic' src={post.user.picture}
                      alt={post.user.username} /></span><b>{post.user.username}</b></span>) : (<div><Avatar id='avatar' key={post._id} /><b>{post.user.username}</b></div>)} <p>{post.description}</p><br />
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
          </Typography>
        </main>
      </div>

      <aside id='sidebar'>

        <div className={classes.toolbar} />

        <h3 >My Friends</h3>
        {
          user.myFriends.map((singleFriend) => {
            return (<div key={singleFriend._id}>
              <List>
                <p>{singleFriend.username}</p>
              </List>
              <Divider />
            </div>
            );
          })
        }
        <Link to='/userList'><b>Access all users</b></Link>
      </aside>


    </div>
  );
}

export default Timeline;