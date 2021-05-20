import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import Login from "./auth/Login";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Tab, Tabs, Fade } from '@material-ui/core'
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FacebookButton from "./auth/FacebookButton";
import GoogleButton from "./auth/GoogleButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { FastfoodSharp, Home, Lock, LockOpen, People, Person, Settings } from '@material-ui/icons'

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


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    width: 500,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
  const { user, onLogout, onSignUp, error, onLogIn, facebook, onGoogleSuccess, onGoogleFailure } = props;
  const [open, setOpen] = React.useState(false);
  const [sideOpen, updateSideOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

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
  const handleDrawerOpen = () => {
    updateSideOpen(true);
  };
  const handleDrawerClose = () => {
    updateSideOpen(false);
  };
  console.log("inside NavBar", user)
  return (
    <div>
      <nav position="static" className='nav' >

        <Toolbar style={{ flexDirection: "row" }}>
          {
            user ? <IconButton
              color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon /></IconButton> : null
          }
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
          {user ? (
            <div>
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
                edge="start"
                className={classes.menuButton}
                color="inherit"
              >
                <Button>
                  <Link to={`/profile/${user.username}`}>Profile</Link>
                </Button>
              </IconButton>
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit">
                <Button><Link onClick={onLogout}>Log out</Link></Button>
              </IconButton>

            </div>
          ) : (
            <span>
              <Button type="button" onClick={handleOpen}>
                Login or Sign Up
              </Button>
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
                        aria-label="full width tabs example" >
                        <Tab label="Sign Up" {...a11yProps(0)} />
                        <Tab label="Log In" {...a11yProps(1)} />
                        {/* <Tab label="Sign Up with Facebook" {...a11yProps(2)} />
                        <Tab label="Sign Up with Google" {...a11yProps(3)} /> */}
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel className='singup' value={value} index={0} dir={theme.direction}>
                        <SignUp onSubmit={onSignUp} />
                        <div className="authThird">
                          <FacebookButton facebook={facebook} />
                          <GoogleButton onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} />
                        </div>
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        <Login error={error} onLogIn={onLogIn} />
                      </TabPanel>
                    </SwipeableViews>
                  </div>
                </Fade>
              </Modal>
            </span>
          )}
        </Toolbar>
      </nav>
      <Drawer style={{ background: ' #6985c0' }}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={sideOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {user ? (<List>
          <Link to={`/profile/${user.username}/friends`} onClick={handleDrawerClose}>
            <ListItem button  >
              <ListItemIcon>  <People />  </ListItemIcon>
              <ListItemText primary='Friends' />
            </ListItem>
          </Link>
          <Divider />
          <Link to={`/profile/${user.username}/recipes`} onClick={handleDrawerClose}>
            <ListItem button >
              <ListItemIcon>  <FastfoodSharp />  </ListItemIcon>
              <ListItemText primary='Recipes' />
            </ListItem>
          </Link>
          <Divider />
          <Link to={`/profile/${user.username}/settings`} >
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon> <Settings />  </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
          </Link>
        </List>) : (<Link to={`/`} />)}
      </Drawer>
      <div className='phone'>


        {user ? (<span className='phone'>
          <IconButton
            color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon /></IconButton>
          <Link to="/recipes"> <Tab icon={<FastfoodSharp />} label="Recipes" /></Link>
          <Link to={"/timeline"}><Tab icon={<Home />} label="Home" /></Link>
          <Link to={`/profile/${user.username}`}> <Tab icon={<Person />} label="Profile" /></Link>
          <Link to="/userList"><Tab icon={<People />} label="Users" /></Link>
          <Tab icon={<LockOpen />} onClick={onLogout} label="Logout" /></span>) : (
          <span>
            <Link to="/recipes"><Tab icon={<FastfoodSharp />} label="Recipes" /></Link>
            <Tab icon={<Lock />} onClick={handleOpen} label="Log In" />
          </span>)
        }
      </div>
    </div >
  );
}
export default NavBar;
