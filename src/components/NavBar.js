import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import Login from "./auth/Login";

//NAVBAR COMES FROM APP.JS
function NavBar(props) {
  const { user, onLogout, onSignUp, error, onLogIn, onFacebookResponse } =
    props;
  return (
    <div>
      <Link to="/recipes">Recipes</Link>
      <Link to="/add-a-recipe">Add recipe</Link>
      {user ? (
        <div>
          <button onClick={onLogout}>Log out</button>
          <Link to={"/timeline"}>Timeline</Link>
        </div>
      ) : (
        <div>
          <SignUp onSubmit={onSignUp} />
          <Login error={error} onLogIn={onLogIn} />
        </div>
      )}
    </div>
  );
}
export default NavBar;
