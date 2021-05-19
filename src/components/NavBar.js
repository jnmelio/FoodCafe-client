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


//NAVBAR COMES FROM APP.JS
function NavBar(props) {
  const classes = useStyles();
  const { user, onLogout, onSignUp, error, onLogIn } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
console.log(user)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ flexDirection: 'row' }}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Button color="inherit" >  <Link to='/recipes'>Recipes</Link> </Button> </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Button color="inherit" >   <Link to='/add-a-recipe'>Add recipe</Link></Button></IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Button color="inherit" >  <Link to="/chatroom">Access the chat room</Link></Button></IconButton>


          {user ? (
            <>
              <IconButton edge="start" className={classes.menuButton} color="inherit" >
                <Button> <Link to={"/timeline"}>Timeline</Link> </Button>
              </IconButton>
              <IconButton edge="end" className={classes.menuButton} color="inherit" >
                <Button onClick={onLogout} >Log out</Button>
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" >
                <Button ><Link to={`/profile/${user.username}`}>Profile</Link></Button>
              </IconButton>
            </>
          ) : (
            <div>
              <SignUp onSubmit={onSignUp} />
              <Login error={error} onLogIn={onLogIn} />
            </div>
          )}

        </Toolbar>
      </AppBar>
    </div >
  );
}
export default NavBar;
