import { TextareaAutosize } from '@material-ui/core'
import React from 'react'
import { Switch, Route, withRouter, Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
// ADDFORM COMES FROM THE LINK ADD A RECIP IN APP.JS AND A ROUTE IN APP.JS
function AddForm(props) {
  const { onChange, onSubmit, onRadio } = props
  const classes = useStyles();
  return (
    <div>
    <Link to='/'><img src="/logo-without-background.png" class="logo"></img></Link>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
          Add a new Recipe
        </Typography>

      <form onSubmit={onSubmit} className={classes.form} noValidate>
      
        <label>Name</label>
        <input name='name' type='text' /><br />
        <label>Ingredients</label>
        <input multiple={true} name='ingredient' onChange={onChange} /><br />
        <label>Instructions</label><br />
        <TextareaAutosize aria-label="maximum height" rowsMin={5} rowsMax={5} placeholder="Instructions" name='instructions' type='text' />
        <br />
        <label>Video instruction</label>
        <input name='youtube' type='text' /><br />

        <label>Recipe Picture</label><br />
        <input type="file" name="imageUrl" accept="image/png, image/jpeg" />

        <label>Decription</label>
        <input name='description' type='textarea' multiple={true} /><br />
        <label>Cooking Time</label>
        <input name='cookingTime' type='number' placeholder='cooking time in minutes, eg.60' /><span>min</span><br />

        <label>Difficulty</label>
        <select name='difficulty'>
          <option name='difficulty' value="Easy">Easy</option>
          <option name='difficulty' value="Medium">Medium</option>
          <option name='difficulty' value="Hard">Hard</option>
        </select><br />
        <label>Country</label>
        <input name='country' type='text' /><br />
        <label>Category</label>
        <select name='category'>
          <option value="Main Course">Main Course</option>
          <option value="Seafood">Seafood</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Side dish">Side dish</option>
          <option value="Dessert">Dessert</option>
        </select><br />
        <label>Vegetarian ? </label>
        <label> <input type="radio" name="vegetarian" value='true' onChange={onRadio} />Yes</label>

        <label><input type="radio" name="vegetarian" value='false' onChange={onRadio} />No</label>

        <br />
        <button type='submit'> submit</button>
      </form>
      </div>
      </Container>
    </div>
  )
}

export default AddForm;
