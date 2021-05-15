import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import Login from "./components/auth/Login";
import config from "./config";
import SignUp from "./components/auth/SignUp";
import SignUpRandom from "./components/auth/SignUpRandom";
import NavBar from "./components/NavBar";
import AllRecipes from "./components/recipes/AllRecipes";
import RecipeDetails from "./components/recipes/RecipeDetails";
import Timeline from "./components/profile/Timeline";
import AddForm from "./components/recipes/AddForm";

function App(props) {
  const [error, updateError] = useState(null);
  const [user, updateUser] = useState(null);
  const [redirection, updateRedirection] = useState(null);
  const [recipes, updateRecipes] = useState([]);
  const [fetching, updateFetching] = useState(true);
  const [friend, updateFriend] = useState(null);
  const [recipe, updateRecipe] = useState(null);
  const [randomRecipe, updateRandomRecipe] = useState([]);
  const [randomUser, updateRandomUser] = useState([]);



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
    } else if (redirection === "") {
      props.history.push("/");
    } else if (redirection === "timeline") {
      props.history.push("/timeline");
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
        updateRedirection("timeline");
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
        updateFriend(false);
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
        console.log("log out successfull");
        updateRedirection("");
        updateUser(null);
      })
      .catch((errorObj) => {
        console.log("logout nay");
        updateError(errorObj.response.data);
      });
  };

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/signup`, { withCredentials: true })
      .then((response) => {
        updateRandomRecipe(response.data.randomRecipe);
        updateRandomUser(response.data.randomUser);
      })
      .catch(() => {});
  }, []);

  const handleAddAFriend = () => {
    axios
      .post(
        `${config.API_URL}/api/addFriend/${randomUser._id}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log("yay", response.data);
        updateFriend(true);
        updateUser(response.data);
      })
      .catch(() => {});
  };
  const handleAddARecipe = () => {
    axios
      .post(
        `${config.API_URL}/api/addRecipe/${randomRecipe._id}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log("handle add recipe", response.data);
        updateRecipe(true);
        updateUser(response.data);
      })
      .catch(() => {});
  };
  // will run when the recipes are updated
  // useEffect(() => {
  //   props.history.push('/recipes')
  // }, [recipes])

  // loading all the recipes from database
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/recipe`, { withCredentials: true })
      .then((response) => {
        updateRecipes(response.data);
        updateFetching(false);
      })
      .catch(() => {
        console.log("Fetching failed");
      });
  }, []);

  if (fetching) {
    return <p>Loading . . .</p>;
  }

  return (
    <div className="App">
      <NavBar
        onLogout={handleLogout}
        user={user}
        onSignUp={handleSignUp}
        error={error}
        onLogIn={handleLogIn}
      />
            <Link to='/recipes'>Recipes</Link>
      <Link to='/add-a-recipe'>Add recipe</Link>
      <Switch>
        <Route
          path="/signup"
          render={(routeProps) => {
            return (
              <SignUpRandom
                user={user}
                {...routeProps}
                onHandleFriend={handleAddAFriend}
                randomUser={randomUser}
                friend={friend}
                updateUser={updateUser}
                onHandleRecipe={handleAddARecipe}
                recipe={recipe}
                randomRecipe={randomRecipe}
              />
            );
          }}
        />
        <Route
          path="/timeline"
          render={(routeProps) => {
            return <Timeline user={user} updateUser={updateUser} recipes={recipes} {...routeProps} 
              updateRecipe={updateRecipes} 
            />;
          }}
        />
        <Route
          exact
          path="/recipes"
          render={() => {
            return <AllRecipes recipes={recipes} />;
          }}
        />
        <Route
          exact
          path="/recipe-details/:recipeId"
          render={(routeProps) => {
            return <RecipeDetails recipes={recipes} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/recipe-detail/:id"
          render={(routeProps) => {
            return <RecipeDetails recipes={recipes} {...routeProps} />;
          }}
        />
                <Route exact path='/recipes' render={() => { return <AllRecipes recipes={recipes} /> }} />
        <Route exact path='/add-a-recipe' render={() => { return <AddForm recipes={recipes} /> }} />
        <Route exact path='/recipe-details/:recipeId' render={(routeProps) => {
          return <RecipeDetails recipes={recipes} {...routeProps} />
        }} />
        <Route exact path='/recipe-detail/:id' render={(routeProps) => {
          return <RecipeDetails recipes={recipes} {...routeProps} />
        }} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
