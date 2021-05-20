import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



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
//SIGNUP COMES FROM NAVBAR.JS AND THE HANDLE IS IN APP.JS
function SignUp(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ maxWidth: '800px !important' }} className={`{classes.paper} `}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <div className="form-group signUpContainer">
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Enter Username"
              autoFocus
            />
          </div>
          <div className="form-group signUpContainer">
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Enter Email"
              autoFocus
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
        </small>
          </div>
          <div className="form-group signUpContainer">
            <TextField
              autoComplete="password"
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Enter Password"
              autoFocus
            />
          </div>
          <div className="form-group signUpContainer">
            <TextField
              autoComplete="firstName"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Enter your first name"
              autoFocus
            />
          </div>
          <div className="form-group signUpContainer">
            <TextField
              autoComplete="lastName"
              name="lastName"
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Enter your last name"
              autoFocus
            />
          </div>
          <div className="form-group signUpContainer">
            <label for="freeUser">Simple User</label>
            <input type="radio" name="usertype" value="freeUser" />
            <label for="premiumUser">Premium User</label>
            <input type="radio" name="usertype" value="premiumUser" />
          </div>
          <div className="form-group signUpContainer">
            <label htmlFor="inputPicture">Picture</label>
            <input name="imageUrl" accept="image/png, image/jpeg"
              id="icon-button-file" type="file" />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>

        </form>
      </div>
    </Container>

  );
}

export default SignUp;
