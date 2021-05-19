import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import Login from "./auth/Login";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({

  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//NAVBAR COMES FROM APP.JS
function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
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
    <div className='nav phone'>
      <AppBar position="static">
        <Toolbar style={{ flexDirection: "row" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Button color="inherit">
              {" "}
              <Link to="/recipes">Recipes</Link>{" "}
            </Button>{" "}
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Button color="inherit">
              {" "}
              <Link to="/add-a-recipe">Add recipe</Link>
            </Button>
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Button color="inherit">
              {" "}
              <Link to="/userList">Check all users</Link>
            </Button>
          </IconButton>

          {user ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
              >
                <Button>
                  {" "}
                  <Link to={"/timeline"}>Timeline</Link>{" "}
                </Button>
              </IconButton>
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
              >
                <Button onClick={onLogout}>Log out</Button>
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
              >
                <Button>
                  <Link to={`/profile/${user.username}`}>Profile</Link>
                </Button>
              </IconButton>
            </>
          ) : (
            <div>
              <button type="button" onClick={handleOpen}>
                Login or Sign Up
              </button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={`${classes.paper} post`}>
                    <AppBar position="static" color="default">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        <SignUp onSubmit={onSignUp} />
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        <Login error={error} onLogIn={onLogIn} />
                      </TabPanel>
                    </SwipeableViews>
                  </div>
                </Fade>
              </Modal>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;
