/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import config from "./config";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import SignUpRandom from "./components/auth/SignUpRandom";
import NavBar from "./components/NavBar";
import AllRecipes from "./components/recipes/AllRecipes";
import RecipeDetails from "./components/recipes/RecipeDetails";
import Timeline from "./components/profile/Timeline";
import AddForm from "./components/recipes/AddForm";
import EditForm from "./components/recipes/EditForm";
import ChatPage from "./components/chat/ChatPage";
import "./App.css";
import Profile from "./components/profile/Profile";
import Users from "./components/profile/Users";
import UserList from "./components/chat/UserList";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Home from "./components/home/Home";
import FriendsList from "./components/profile/FriendsList";
import MyRecipes from "./components/profile/MyRecipes";
import NotFound from './components/Lottie/NotFound'

function App(props) {
  //STATES
  const [error, updateError] = useState(null);
  const [user, updateUser] = useState(null);
  const [userRecipes, updateUserRecipes] = useState([])
  const [redirection, updateRedirection] = useState(null);
  const [recipes, updateRecipes] = useState([]);
  const [fetching, updateFetching] = useState(true);
  const [friend, updateFriend] = useState(null);
  const [recipe, updateRecipe] = useState(null);
  const [randomRecipe, updateRandomRecipe] = useState([]);
  const [randomUser, updateRandomUser] = useState([]);
  const [ingredients, updateIngredients] = useState([]);
  const [trueFalse, updateTrueFalse] = useState(null);
  const [allUsers, updateAllUsers] = useState([]);
  const [users, updateUsers] = useState([]);
  const [showLoading, updateShowLoading] = useState(true)

  //FIRST USE EFFECT
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        fetchUsers();
        updateFetching(false);
      })
      .catch(() => {});
  }, []);

  //USE EFFECT FOR REDIRECTION
  useEffect(() => {
    if (redirection === "signup") {
      props.history.push("/signup");
    } else if (redirection === "") {
      props.history.push("/");
    } else if (redirection === "timeline") {
      props.history.push("/timeline");
    }
  }, [props.history, redirection]);

  //LOGIN LOGIC AND AXIOS
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
        fetchUsers();
        updateError(null);
        updateRedirection("timeline");
      })
      .catch((errObj) => {
        updateError(errObj.response.data);
      });
  };

  //SIGNUP LOGIC AND AXIOS
  const handleSignUp = (event) => {
    event.preventDefault();
    console.log(event.target.imageUrl.files[0])
    let picture = null
    const { username, firstName, lastName, email, password, usertype, } = event.target;

    if (event.target.imageUrl.files[0]) {
      picture = event.target.imageUrl.files[0];
      let formData = new FormData();
      formData.append("imageUrl", picture);
      axios.post(`${config.API_URL}/api/upload`, formData)
        .then((response) => {
          return axios.post(`${config.API_URL}/api/signup`,
            {
              username: username.value,
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value,
              password: password.value,
              usertype: usertype.value,
              picture: response.data.picture,
            }, { withCredentials: true })
        })
        .then((response) => {
          updateFriend(false);
          updateUser(response.data);
          updateError(null);
          updateRedirection("signup");
        })
        .catch(() => {
          console.log("SignUp failed");
        });
    }
    else {
      picture = 'https://res.cloudinary.com/foodcafe/image/upload/v1621522073/wxwrhxypbk95guknlxt3.png'
      return axios.post(`${config.API_URL}/api/signup`,
        {
          username: username.value,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
          usertype: usertype.value,
          picture,
        }, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        fetchUsers();
        handleRandom()
        updateRedirection("signup");
        updateFriend(false);
        updateError(null);
      })
      .catch(() => {
        console.log("SignUp failed");
      });
  }};

  //LOGOUT LOGIC
  const handleLogout = () => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        console.log("log out successfull");
        updateRedirection("");
        updateUser(null);
      })
      .catch((errorObj) => {
        updateError(errorObj);
      });
  };

// //FACEBOOK LOGIN
const handleFacebookReponse = (data) => {

	const {name, email, picture: {data: {url}}, userID} = data
	let newUser = {name, email, picture: url, facebookId: userID}

	axios.post(`${config.API_URL}/api/facebook/info`, newUser , {withCredentials: true})
		.then((response) => {
      updateError(null)
      updateShowLoading(false)
      updateUser(response.data.data)
      updateRedirection('timeline')
		})
}

//GOOGLE AUTH
const handleGoogleSuccess= (data) => {
  updateShowLoading(true)
	const {givenName, familyName, email, imageUrl, googleId} = data.profileObj
	let newUser = {
		firstName: givenName,
		lastName: familyName,
		email,
		picture: imageUrl,
		googleId
	}

	axios.post(`${config.API_URL}/api/google/info`, newUser , {withCredentials: true})
		.then((response) => {
      updateUser(response.data.data)
      updateError(null)
      updateShowLoading(false)
      updateRedirection('timeline')
		})
}

const handleGoogleFailure = (error) => {
  //TODO: Handle these errors yourself the way you want. Currently the state is not in use
  console.log(error) 
  updateError(true)
}
  // USE EFFECT FOR RANDOM USER AND RECIPE AFTER SIGNUP
  const handleRandom = () => {
    axios
      .get(`${config.API_URL}/api/signup`, { withCredentials: true })
      .then((response) => {
        updateRandomRecipe(response.data.randomRecipe);
        updateRandomUser(response.data.randomUser);
        updateFetching(false);
      })
      .catch(() => {});
  };

  //ADD A FRIEND AFTER SIGN UP
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
  //ADD A FRIEND ANYTIME
  const handleAddAnotherFriend = (singleUser) => {
    axios
      .post(
        `${config.API_URL}/api/addFriend/${singleUser._id}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        let updatedUser = response.data;
        console.log("yay", singleUser._id);
        console.log("user", user);
        // updateFriend(true);
        updateUser(updatedUser);
      })
      .catch(() => {});
  };
  //talk to a friend
  const fetchUsers = () => {
    axios
      .get(`${config.API_URL}/api/users`, { withCredentials: true })
      .then((response) => {
        updateUsers(response.data);
      })
      .catch((err) => {
        console.log("user not logged in");
      });
  };

  //ADD A RECIPE AFTER SIGN UP
  const handleAddMyRecipe = () => {
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

  //SHOW ALL USERS FROM DB
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/users`, { withCredentials: true })
      .then((response) => {
        updateAllUsers(response.data);
        updateFetching(false);
      })
      .catch(() => {
        console.log("Fetching failed");
      });
  }, []);
  // -----------------------------------------------****************************--------------------------
  // RECIPES HANDLERS

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

  //CREATE A RECIPE
  let ingredientArr = [];
  const handleRadio = (event) => {
    let value = event;
    if (typeof event.currentTarget.value === "string") {
      event.currentTarget.value === "true" ? (value = true) : (value = false);
    }
    updateTrueFalse(value);
  };
  const handleAddRecipe = (e) => {
    e.preventDefault();
    console.log(e)
    let picture = e.target.imageUrl.files[0];
    let formData = new FormData();
    formData.append("imageUrl", picture);
    axios
      .post(`${config.API_URL}/api/upload`, formData)
      .then((response) => {
        return axios.post(`${config.API_URL}/api/recipe/add`,
          {
            name: e.target.name.value,
            ingredients,
            instructions: e.target.instructions.value,
            youtube: e.target.youtube.value,
            picture: response.data.picture,
            description: e.target.description.value,
            cookingTime: Number(e.target.cookingTime.value),
            difficulty: e.target.difficulty.value,
            country: e.target.country.value,
            category: e.target.category.value,
            vegetarian: trueFalse,
            created_by: user._id,
          },
          { withCredentials: true }
        );
      })

      .then((result) => {
        console.log(result.data);
        updateRecipes([result.data, ...recipes]);
        props.history.push("/recipes");

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    let input = e.target.value;
    if (input) {
      ingredientArr.push(input.split(","));
      updateIngredients(ingredientArr[ingredientArr.length - 1]);
    }
  };
  // UPDATE RECIPE
  const handleUpdate = () => {
    console.log(recipe.difficulty);
    axios
      .patch(
        `${config.API_URL}/api/recipe/${recipe._id}`,
        {
          name: recipe.name,
          ingredients,
          instructions: recipe.instructions,
          youtube: recipe.youtube,
          picture: recipe.picture,
          description: recipe.description,
          cookingTime: Number(recipe.cookingTime),
          difficulty: recipe.difficulty,
          country: recipe.country,
          category: recipe.category,
          vegetarian: trueFalse,
          created_by: user._id,
        },
        { withCredentials: true }
      )
      .then(() => {
        console.log(recipe.difficulty);
        let newRecipes = recipes.map((singleRecipe) => {
          if (recipe._id === singleRecipe._id) {
            singleRecipe.name = recipe.name;
            singleRecipe.description = recipe.description;
          }
          return singleRecipe;
        });
        updateRecipes(newRecipes);
        props.history.push(`/recipe-details/${recipe._id}`);
      })
      .catch((err) => {
        console.log("Edit failed", err);
      });
  };
  //  --------------------------delete recipe
  const handleDelete = (recipeId) => {
    //1. Make an API call to the server side Route to delete that specific todo
    axios
      .delete(
        `${config.API_URL}/api/recipe/${recipeId}`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        // 2. Once the server has successfully created a new todo, update your state that is visible to the user
        console.log("inside then", recipes);
        let filteredRecipes = recipes.filter((recipe) => {
          return recipe._id !== recipeId;
        });
        updateRecipes(filteredRecipes);
        props.history.push("/recipes");
      })
      .catch((err) => {
        console.log("Delete failed", err);
      });
  };

  // -------------------------------------------------**********************------------------------------------
  // -------------------------------------------------**********************------------------------------------
  //LOADING SCREEN
  if (fetching) {
    return <p>Loading . . .</p>;
  }
  console.log(user)
  return (
    <div className="App">
      <NavBar
        onLogout={handleLogout}
        user={user}
        onSignUp={handleSignUp}
        error={error}
        onLogIn={handleLogIn}
        recipes={recipes}
        facebook={handleFacebookReponse}
        onGoogleSuccess={handleGoogleSuccess}
        onGoogleFailure={handleGoogleFailure}
      />


      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => {
            return <Home user={user} {...routeProps} recipes={recipes} />;
          }}
        />
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
                onHandleRecipe={handleAddMyRecipe}
                recipe={recipe}
                randomRecipe={randomRecipe}
                fetching={fetching}
                updateFetching={updateFetching}
              />
            );
          }}
        />
        <Route
          exact
          path="/timeline"
          render={(routeProps) => {
            return (
              <Timeline
                user={user}
                updateUserRecipes={updateUserRecipes}
                updateUser={updateUser}
                recipes={recipes}
                {...routeProps}
                updateRecipe={updateRecipes}
              />
            );
          }}
        />
        <Route
          exact
          path="/recipes"
          render={() => {
            return <AllRecipes recipes={recipes} user={user} />;
          }}
        />
        <Route
          exact
          path="/profile/:username"
          render={(routeProps) => {
            return (
              <Profile
                user={user}
                updateUser={updateUser}
                recipes={recipes}
                {...routeProps}
                updateRecipe={updateRecipes}
              />
            );
          }}
        />
        <Route
          exact
          path="/profile/:username/friends"
          render={(routeProps) => {
            return (
              <FriendsList
                user={user}
                updateUser={updateUser}
                recipes={recipes}
                {...routeProps}
                updateRecipe={updateRecipes}
              />
            );
          }}
        />
        <Route
          exact
          path="/profile/:username/recipes"
          render={(routeProps) => {
            return (
              <MyRecipes
                user={user}
                updateUser={updateUser}
                recipes={recipes}
                {...routeProps}
                updateRecipe={updateRecipes}
              />
            );
          }}
        />
        <Route
          exact
          path="/recipe-details/:recipeId"
          render={(routeProps) => {
            return (
              <RecipeDetails
                recipes={recipes}
                updateUser={updateUser}
                user={user}
                onDelete={handleDelete}
                redirection={redirection}
                updateRedirection={updateRedirection}
                userRecipes={userRecipes}
                updateUserRecipes={updateUserRecipes}
                {...routeProps}
              />
            );
          }}
        />
        <Route
          exact
          path="/edit-a-recipe/:recipeId"
          render={(routeProps) => {
            return (
              <EditForm
                recipe={recipe}
                updateRecipe={updateRecipe}
                onRadio={handleRadio}
                user={user}
                ingredients={ingredients}
                updateIngredients={updateIngredients}
                onEdit={handleUpdate}
                onType={handleOnChange}
                sredirection={redirection}
                updateRedirection={updateRedirection}
                {...routeProps}
              />
            );
          }}
        />
        <Route
          exact
          path="/chat/:chatId"
          render={(routeProps) => {
            return <ChatPage user={user} {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/userList"
          render={(routeProps) => {
            return (
              <UserList
                user={user}
                users={users}
                updateUser={updateUser}
                onAddaFriend={handleAddAnotherFriend}
                fetching={fetching}
                updateFetching={updateFetching}
                {...routeProps}
              />
            );
          }}
        />
        <Route
          exact
          path="/add-a-recipe"
          render={() => {
            return (
              <AddForm
                onRadio={handleRadio}
                recipes={recipes}
                onChange={handleOnChange}
                onSubmit={handleAddRecipe}
              />
            );
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}


export default withRouter(App)
