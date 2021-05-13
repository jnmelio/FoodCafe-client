import React from "react";
import { Link } from "react-router-dom";
import SignUp from '../components/auth/SignUp'
import Login from './auth/Login'

function NavBar(props) {
  const { user, onLogout, onSignUp, error, onLogIn } = props;
  return (
    <div>
      {user ? (
        <button onClick={onLogout} >Log out</button>
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
