import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import HomePage from "./pages/HomePage";
import config from "./config";
import SignUp from "./components/auth/SignUp";
import SignUpRandom from "./components/SignUpRandom";
import NavBar from "./components/NavBar";

function App(props) {
  const [error, updateError] = useState(null);
  const [user, updateUser] = useState(null);
  const [redirection, updateRedirection] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
      })
      .catch(() => {});
  }, []);

  // useEffect(() => {
  //   props.history.push("/profile");
  // }, [user, error]);

  useEffect(() => {
    if (redirection === "signup") {
      props.history.push("/signup");
    } else if (redirection === '') {
      props.history.push("/");
    }
  }, [redirection]);

  const handleLogIn = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    let newUser = {
      email: email.value,
      password: password.value,
    };

    axios
      .post(`${config.API_URL}/api/login`, newUser, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        updateError(null);
      })
      .catch((errObj) => {
        updateError(errObj.response.data);
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log(event);
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      usertype,
      picture,
    } = event.target;

    let newUser = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      usertype: usertype.value,
      picture: picture.value,
    };

    axios
      .post(`${config.API_URL}/api/signup`, newUser, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        updateError(null);
        updateRedirection("signup");
      })
      .catch(() => {
        console.log("SignUp failed");
      });
  };

  const handleLogout = () => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        console.log('log out successfull')
        updateRedirection('')
        updateUser(null);
      })
      .catch((errorObj) => {
        console.log('logout nay')
        updateError(errorObj.response.data);
      });
  };

  return (
    <div className="App">
      <NavBar onLogout={handleLogout} user={user} onSignUp={handleSignUp} error={error} onLogIn={handleLogIn}/>
      <Switch>
        <Route
          path="/signup"
          render={(routeProps) => {
            return <SignUpRandom {...routeProps} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
