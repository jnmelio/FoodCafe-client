import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
// import Login from "./components/auth/Login";
// import HomePage from "./components/Home";
import config from "./config";
// import SignUp from "./components/auth/SignUp";
import SignUpRandom from "./components/SignUpRandom";
import NavBar from "./components/NavBar";
import AllRecipes from './components/recipes/AllRecipes';
import RecipeDetails from "./components/recipes/RecipeDetails";
import AddForm from "./components/recipes/AddForm";
import EditForm from "./components/recipes/EditForm";

function App(props) {
  const [error, updateError] = useState(null);
  const [user, updateUser] = useState(null);
  const [redirection, updateRedirection] = useState(null);
  const [recipes, updateRecipes] = useState([])
  const [fetching, updateFetching] = useState(true)
  const [ingredients, updateIngredients] = useState([]);
  const [trueFalse, updateTureFalse] = useState(null)

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
      })
      .catch(() => { });
  }, []);



  useEffect(() => {
    if (redirection === "signup") {
      props.history.push("/signup");
    } else if (redirection === '') {
      props.history.push("/");
    }
  }, [props.history, redirection]);

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
  // -----------------------------------------------****************************--------------------------
  // RECIPES HANDLERS
  // will run when the recipes are updated
  // useEffect(() => {
  //   props.history.push('/recipes')
  // },)

  // loading all the recipes from database
  useEffect(() => {
    axios.get(`${config.API_URL}/api/recipe`, { withCredentials: true })
      .then((response) => {
        updateRecipes(response.data)
        updateFetching(false)
      })
      .catch(() => {
        console.log('Fetching failed')
      })
  }, [])

  // handling new recipe____________
  let ingredientArr = []
  const handleRadio = (event) => {
    let value = true;
    if (typeof event.currentTarget.value === 'string') {
      (event.currentTarget.value === 'true' ? value = true : value = false);
    }
    updateTureFalse(value);
  }
  const handleAddRecipe = (e) => {
    e.preventDefault()
    let picture = e.target.imageUrl.files[0]

    let formData = new FormData()
    formData.append('imageUrl', picture)
    axios.post(`${config.API_URL}/api/upload`, formData)
      .then((response) => {
        console.log(response.data)
        return axios.post(`${config.API_URL}/api/recipe/add`, {
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
          created_by: user._id
        }, { withCredentials: true })

      })

      .then((result) => {
        console.log(result.data)
        updateRecipes([result.data, ...recipes])

      }).catch((err) => {
        console.log(err)
      });


  }

  const handleOnChange = (e) => {
    e.preventDefault()
    let input = e.target.value
    ingredientArr.push(input.split(','))
    updateIngredients(ingredientArr[(ingredientArr.length - 1)])
  };

  const handleUpdate = (recipe) => {
    axios.patch(`${config.API_URL}/api/recipe/${recipe._id}`, {
      name: recipe.name,
      description: recipe.description,
      completed: recipe.completed,
    }, { withCredentials: true })
      .then(() => {
        let newRecipes = recipes.map((singleRecipe) => {
          if (recipe._id === singleRecipe._id) {
            singleRecipe.name = recipe.name
            singleRecipe.description = recipe.description
          }
          return singleRecipe
        })
        updateRecipes(newRecipes)
      })
      .catch((err) => {
        console.log('Edit failed', err)
      })

  }

  // -------------------------------------------------**********************------------------------------------
  // -------------------------------------------------**********************------------------------------------
  if (fetching) {
    return <p>Loading . . .</p>
  }
  return (
    <div className="App">
      <NavBar onLogout={handleLogout} user={user} onSignUp={handleSignUp} error={error} onLogIn={handleLogIn} />
      <Switch>
        <Route
          path="/signup"
          render={(routeProps) => {
            return <SignUpRandom {...routeProps} />;
          }}
        />
        <Route exact path='/recipes' render={() => { return <AllRecipes recipes={recipes} /> }} />
        <Route exact path='/add-a-recipe' render={() => { return <AddForm onRadio={handleRadio} recipes={recipes} onChange={handleOnChange} onSubmit={handleAddRecipe} /> }} />
        <Route exact path='/recipe-details/:recipeId' render={(routeProps) => {
          return <RecipeDetails recipes={recipes} {...routeProps} />
        }} />
        <Route exact path='/edit-a-recipe/:id' render={(routeProps) => {
          return <EditForm recipes={recipes} onRadio={handleRadio} onChange={handleOnChange} onUpdate={handleUpdate} {...routeProps} />
        }} />

      </Switch>
    </div>
  );
}

export default withRouter(App);
