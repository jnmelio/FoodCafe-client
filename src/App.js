import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import './App.css'
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
  const [trueFalse, updateTrueFalse] = useState(null)

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
    updateTrueFalse(value);
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
        props.history.push("/recipes")

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
  // edit the damn recipe 
  const handleEditRecipe = (recipe) => {
    console.log(recipe, 'vjen ktu ')
    let newRecipes = recipes.filter(singleRecipe => recipe.name !== singleRecipe.name)
    updateRecipes(newRecipes)
    axios.patch(`${config.API_URL}/api/recipe/${recipe.id}`, recipe, { withCredentials: true })
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
        <Route exact path='/add-a-recipe' render={() => {
          return <AddForm onRadio={handleRadio}
            recipes={recipes} onChange={handleOnChange} onSubmit={handleAddRecipe} />
        }} />
        <Route exact path='/recipe-details/:recipeId' render={(routeProps) => {
          return <RecipeDetails recipes={recipes} onDelete={handleDelete}{...routeProps} />
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
