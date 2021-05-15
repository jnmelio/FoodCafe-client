import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";

//RECIPE DETAILS COMES FROM A LINK IN ALLRECIPES.JS AND A ROUTE IN APP.JS
function RecipeDetails(props) {
  const [recipe, updateRecipe] = useState({});
  const [fetching, updateFetching] = useState(true);
  const { recipes, user, updateUser } = props;
  let random = Math.floor(Math.random() * props.recipes.length);
  let recipeId = recipes[random]._id;
  useEffect(() => {
    let recipeId = props.match.params.recipeId;
    if (recipeId) {
      axios
        .get(`${config.API_URL}/api/recipe/${recipeId}`, {
          withCredentials: true,
        })
        .then((response) => {
          updateRecipe(response.data);
          updateFetching(false);
        })
        .catch(() => {
          console.log("Detail fecth failed");
        });
    } else {
      axios
        .get(`${config.API_URL}/api/recipe/${recipeId}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          updateRecipe(response.data);
          updateFetching(false);
        })
        .catch(() => {
          console.log("Detail fecth failed1");
        });
    }
  }, [props.match.params.recipeId]);

  const handleAddRecipeToList = () => {
    let recipeId = props.match.params.id;
    axios
      .post(
        `${config.API_URL}/api/recipe/${recipeId}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log("handle add recipe", response.data);
        updateUser(response.data);
      })
      .catch(() => {});
  };
  // const { onDelete, user } = props
  if (fetching) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <Link to={`/recipe-details/${recipeId}`}>Random recipe</Link>
      <Link to={`/edit-a-recipe/${recipe._id}`}>
        <button>Edit</button>
      </Link>
      <button>Delete</button>
      <h4>{recipe.name}</h4>
      <div>
        <img src={recipe.picture} alt={recipe.name}></img>
      </div>
      <div>
        <b>Description:</b> {recipe.description}
      </div>{" "}
      <br></br>
      <div>{recipe.vegetarian && <b>Vegetarian</b>} </div>
      <div>
        <b>Ingredients:</b>
        {recipe?.ingredients.map((ingredient, i) => {
          return (
            <ul key={i}>
              <li>{ingredient}</li>
            </ul>
          );
        })}{" "}
      </div>
      <div>
        {" "}
        <b>Cooking Time:</b> {recipe.cookingTime} min
      </div>
      <div>
        <b>
          Dificulty:<i> {recipe.difficulty}</i>
        </b>
      </div>
      <div>
        Video Instructions: <a href={recipe.youtube}>Click for video</a>
      </div>
      <div>
        {" "}
        <b>Instructions:</b> {recipe.instructions}
      </div>
      <div>
        {" "}
        <b>Created By:</b> {recipe.created_by}
      </div>
      <div>
        {" "}
        <b>Country :</b> {recipe.country}
      </div>
      <div>
        {" "}
        <b>Category :</b> {recipe.category}
      </div>
      <Link to={`/edit-a-recipe/${recipe._id}`}>
        <button>Edit</button>
      </Link>
      <button>Delete</button>
      <button onClick={handleAddRecipeToList}>
        Add this recipe to my Recipes
      </button>
    </div>
  );
}

export default RecipeDetails;
