import React from "react";

//SIGNUP COMES FROM NAVBAR.JS AND THE HANDLE IS IN APP.JS
function SignUp(props) {
  const { onSubmit } = props;

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="InputUsername">Username</label>
        <input
          type="text"
          className="form-control"
          id="InputUsername"
          name="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="InputEmail">Email address</label>
        <input
          type="email"
          className="form-control"
          id="InputEmail"
          name="email"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="InputPassword">Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="InputPassword"
        />
      </div>
      <div className="form-group">
        <label htmlFor="InputFirstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="InputFirstName"
          name="firstName"
        />
      </div>
      <div className="form-group">
        <label htmlFor="InputLastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="InputLastName"
          name="lastName"
        />
      </div>
      <div className="form-group">
        <label for="freeUser">Simple User</label>
        <input type="radio" name="usertype" value="freeUser" />
        <label for="premiumUser">Premium User</label>
        <input type="radio" name="usertype" value="premiumUser" />
      </div>
      <div className="form-group">
        <label htmlFor="inputPicture">Picture</label>
        <input name="imageUrl" accept="image/png, image/jpeg"
          id="icon-button-file" type="file" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SignUp;
