/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import Login from "./components/auth/Login";
import HomePage from "./components/Home";
import config from "./config";
import SignUp from "./components/auth/SignUp";
import SignUpRandom from "./components/auth/SignUpRandom";
import NavBar from "./components/NavBar";
import AllRecipes from "./components/recipes/AllRecipes";
import RecipeDetails from "./components/recipes/RecipeDetails";
import Timeline from "./components/profile/Timeline";
import AddForm from "./components/recipes/AddForm";
import EditForm from "./components/recipes/EditForm";
import ChatPage from "./components/chat/ChatPage";
import './App.css'
import Profile from "./components/profile/Profile";

function App(props) {
  //STATES
  const [error, updateError] = useState(null);
  const [user, updateUser] = useState(null);
  const [redirection, updateRedirection] = useState(null);
  const [recipes, updateRecipes] = useState([]);
  const [fetching, updateFetching] = useState(true);
  const [friend, updateFriend] = useState(null);
  const [recipe, updateRecipe] = useState(null);
  const [randomRecipe, updateRandomRecipe] = useState([]);
  const [randomUser, updateRandomUser] = useState([]);
  const [ingredients, updateIngredients] = useState([]);
  const [trueFalse, updateTrueFalse] = useState(null)

  //FIRST USEEFFECT
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        updateFetching(false);
      })
      .catch(() => { });
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
        console.log("logout nay");
        updateError(errorObj.response.data);
      });
  };

  // USE EFFECT FOR RANDOM USER AND RECIPE AFTER SIGNUP
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/signup`, { withCredentials: true })
      .then((response) => {
        updateRandomRecipe(response.data.randomRecipe);
        updateRandomUser(response.data.randomUser);
        updateFetching(false);
      })
      .catch(() => { });
  }, []);

  //ADD A FRIEND AFTER SIGNUP
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
      .catch(() => { });
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
      .catch(() => { });
  };

  // -----------------------------------------------****************************--------------------------
  // RECIPES HANDLERS
  // will run when the recipes are updated
  // useEffect(() => {
  //   props.history.push('/recipes')
  // },)
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
    let value = true;
    if (typeof event.currentTarget.value === "string") {
      event.currentTarget.value === "true" ? (value = true) : (value = false);
    }
    updateTrueFalse(value);
  }
  const handleAddRecipe = (e) => {
    e.preventDefault()
    let picture = e.target.imageUrl.files[0]
    let formData = new FormData()
    formData.append('imageUrl', picture)
    axios.post(`${config.API_URL}/api/upload`, formData)
      .then((response) => {
        console.log(response.data);
        return axios.post(
          `${config.API_URL}/api/recipe/add`,
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
        console.log(result.data)
        updateRecipes([result.data, ...recipes])
        props.history.push("/recipes")

      }).catch((err) => {
        console.log(err)
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    let input = e.target.value;
    ingredientArr.push(input.split(","));
    updateIngredients(ingredientArr[ingredientArr.length - 1]);
  };
  // edit the damn recipe 
  const handleEditRecipe = (recipe) => {
    console.log(recipe, 'vjen ktu ')
    let newRecipes = recipes.filter(singleRecipe => recipe.name !== singleRecipe.name)
    updateRecipes(newRecipes)
    axios.patch(`${config.API_URL}/api/recipe/${recipe.id}`, { recipe }, { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        updateRecipes(...recipes, recipe)

      })
      .catch((err) => {
        console.log(recipe, 'err')
        console.log('Edit failed', err)
      })

  }
  //  --------------------------delete recipe

  const handleDelete = (recipeId) => {

    //1. Make an API call to the server side Route to delete that specific todo
    axios.delete(`${config.API_URL}/api/recipe/${recipeId}`, {}, { withCredentials: true })
      .then(() => {
        // 2. Once the server has successfully created a new todo, update your state that is visible to the user
        console.log('inside then', recipes)
        let filteredRecipes = recipes.filter((recipe) => {
          return recipe._id !== recipeId
        })
        updateRecipes(filteredRecipes)
        props.history.push('/recipes')
      })
      .catch((err) => {
        console.log('Delete failed', err)
      })
  }
  // const handleUpdate = (recipe) => {
  //   axios.patch(`${config.API_URL}/api/recipe/${recipe._id}`, {
  //     name: recipe.name,
  //     description: recipe.description,
  //     completed: recipe.completed,
  //   }, { withCredentials: true })
  //     .then(() => {
  //       let newRecipes = recipes.map((singleRecipe) => {
  //         if (recipe._id === singleRecipe._id) {
  //           singleRecipe.name = recipe.name
  //           singleRecipe.description = recipe.description
  //         }
  //         return singleRecipe
  //       })
  //       updateRecipes(newRecipes)
  //     })
  //     .catch((err) => {
  //       console.log('Edit failed', err)
  //     })

  // }

  // -------------------------------------------------**********************------------------------------------
  // -------------------------------------------------**********************------------------------------------
  //LOADING SCREEN
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
        recipes={recipes}
      />

      <Switch>
        <Route
          path="/signup"
          render={(routeProps) => {
            return (<SignUpRandom user={user} {...routeProps} onHandleFriend={handleAddAFriend}
              randomUser={randomUser} friend={friend} updateUser={updateUser} onHandleRecipe={handleAddMyRecipe}
              recipe={recipe} randomRecipe={randomRecipe} />);
          }} />
        <Route
          exact path="/timeline"
          render={(routeProps) => {
            return (<Timeline user={user} updateUser={updateUser} recipes={recipes}
              {...routeProps} updateRecipe={updateRecipes} />);
          }} />
        <Route
          exact path="/profile/:username"
          render={(routeProps) => {
            return (<Profile user={user} updateUser={updateUser} recipes={recipes}
              {...routeProps} updateRecipe={updateRecipes} />);
          }} />
        <Route exact path="/chatroom"
          render={(routeProps) => {
            return <ChatPage {...routeProps} />;
          }} />
        <Route exact path='/recipes' render={() => {
          return <AllRecipes recipes={recipes} />
        }} />
        <Route exact path='/add-a-recipe' render={() => {
          return <AddForm onRadio={handleRadio}
            recipes={recipes} onChange={handleOnChange} onSubmit={handleAddRecipe} />
        }} />
        <Route exact path='/recipe-details/:recipeId' render={(routeProps) => {
          return <RecipeDetails recipes={recipes} updateUser={updateUser} user={user} onDelete={handleDelete}{...routeProps} />
        }} />
        <Route exact path='/edit-a-recipe/:recipeId' render={(routeProps) => {
          return <EditForm onRadio={handleRadio} user={user} ingredients={ingredients}
            updateIngredients={updateIngredients} onEdit={handleEditRecipe}
            sredirection={redirection} updateRedirection={updateRedirection} {...routeProps} />
        }} />

      </Switch>
    </div>
  );
}

export default withRouter(App);
