import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SignUp from '../components/auth/SignUp'
import Login from './auth/Login'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function NavBar(props) {
  const classes = useStyles();
  const { user, onLogout, onSignUp, error, onLogIn } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Button color="inherit" >  <Link to='/recipes'>Recipes</Link> </Button>
            <Button color="inherit" >   <Link to='/add-a-recipe'>Add recipe</Link></Button>
          </IconButton>
          <IconButton edge="end" className={classes.grow} color="inherit" >
            {user ? (
              <Button color="inherit" onClick={onLogout} >Log out</Button>
            ) : (
              <div>
                <SignUp onSubmit={onSignUp} />
                <Login error={error} onLogIn={onLogIn} />
              </div>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div >
  );
}
export default NavBar;
