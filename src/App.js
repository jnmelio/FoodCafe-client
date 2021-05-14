/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import AllRecipes from './components/recipes/AllRecipes';
import axios from 'axios'
import config from './config'
import RecipeDetails from "./components/recipes/RecipeDetails";
import AddForm from "./components/recipes/AddForm";

function App(props) {
  const [recipes, updateRecipes] = useState([])
  const [fetching, updateFetching] = useState(true)
  // will run when the recipes are updated
  // useEffect(() => {
  //   props.history.push('/recipes')
  // }, [recipes])

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

  if (fetching) {
    return <p>Loading . . .</p>
  }
  return (
    <div className="App">
      <Link to='/recipes'>Recipes</Link>
      <Link to='/add-a-recipe'>Add recipe</Link>
      <Switch>

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
