/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { Card, CardHeader, CardMedia } from "@material-ui/core";
import ReactPlayer from "react-player";
import Button from '@material-ui/core/Button';


//RECIPE DETAILS COMES FROM A LINK IN ALLRECIPES.JS AND A ROUTE IN APP.JS
function RecipeDetails(props) {
  const [recipe, updateRecipe] = useState(null);
  const [fetching, updateFetching] = useState(true);
  const {
    recipes, onDelete, user, updateUser, userRecipes, updateUserRecipes, } = props;


  console.log(userRecipes);

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
      let random = Math.floor(Math.random() * props.recipes.length);
      let recId = recipes[random]._id;
      axios
        .get(`${config.API_URL}/api/recipe/${recId}`, { withCredentials: true })
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

  if (!user) {
    props.history.push("/");
  }

  // const { onDelete, user } = props
  if (fetching) {
    return <p>Loading ...</p>;
  }

  const handleAddRecipeToList = () => {
    let id = props.match.params.recipeId;

    console.log("props", props.match);
    console.log("id", id);
    console.log("recipeId", props.match.params.recipeId);
    axios
      .post(`${config.API_URL}/api/recipe/${id}`, {}, { withCredentials: true })
      .then((response) => {
        console.log("handle add recipe", response.data);
        updateUser(response.data);
        updateUserRecipes(response.data.recipe);
      })
      .catch(() => { });
  };

  return (
    <div>
      <Link to="/">
        {/* eslint-disable-next-line jsx-a11y/alt-text*/}
        <img src="/logo-without-background.png" class="logo"></img>
      </Link>
      <div className="container">
        <Card
          style={{
            maxWidth: 700,
          }}
        >

          {userRecipes.includes(recipe._id) ? (
            <p>You already have this recipe in your list</p>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAddRecipeToList}>
              Add to my Recipes
            </Button>
          )}

          <Button variant="contained"><Link to={`/edit-a-recipe/${recipe._id}`}>Edit </Link></Button>

          <Button variant="contained" color="secondary"
            onClick={() => {
              onDelete(recipe._id);
            }}
          >
            Delete
          </Button>
          <CardHeader
            title={recipe.name}
            subheader={recipe.vegetarian && <b>Vegetarian</b>}
          />
          <CardMedia
            style={{
              height: "0",
              paddingTop: "56.25%",
            }}
            image={recipe.picture}
            title={recipe.name}
          />
          <div className="recipeDetails">
            <h3>Description</h3>{" "}
            <p className="recipeDescription">{recipe.description}</p>
          </div>{" "}
          <div className="recipeHeader">
            <div className="recipeInfos">
              <h3>Difficulty</h3>
              <i className="recipeDescription"> {recipe.difficulty}</i>
            </div>
            <div className="recipeInfos">
              <h3>Category</h3>
              <i className="recipeDescription">{recipe.category}</i>
            </div>
            <div className="recipeInfos">
              {" "}
              <h3>Country </h3>{" "}
              <i className="recipeDescription">{recipe.country}</i>
            </div>
            <div className="recipeInfos">
              {" "}
              <h3>Cooking Time</h3>{" "}
              <i className="recipeDescription"> {recipe.cookingTime}min</i>
            </div>
          </div>
          <br></br>
          <div className="recipeDetails">
            <h3>Ingredients:</h3>
            {recipe?.ingredients.map((ingredient, i) => {
              return (
                <ul key={i} className="recipeList">
                  <li>{ingredient}</li>
                </ul>
              );
            })}{" "}
          </div>
          <div className="recipeDetails">
            {" "}
            <h3>Instructions:</h3>{" "}
            <p className="recipeDescription">{recipe.instructions}</p>
          </div>
          <div className="video">
            <ReactPlayer url={recipe.youtube} />
          </div>
          <div>
            {" "}
            {recipe.created_by && (
              <p>
                {" "}
                <b>Created By:</b> {recipe.created_by.username}
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RecipeDetails;
