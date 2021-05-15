import React, { useEffect, useState } from "react";
import RecipeDetails from "./RecipeDetails";
import axios from "axios";
import config from "../../config";

function EditForm(props) {
    const [fetching, updateFetching] = useState(true);

    const { onChange, onUpdate, onRadio } = props;
    const [recipe, updateRecipe] = useState({});

    useEffect(() => {
        let recipeId = props.match.params.id;

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
    }, []);

    const myInput = () => {
        return recipe.name
    }
    if (fetching) {
        return <p>Loading ...</p>;
    }

    return (
        <div>
            <h1>Edit this Recipe</h1>
            <form onSubmit={onUpdate}>
                <label>Name</label>
                <input name="name" type="text" ref={myInput} />
                <br />
                <label>Ingredients</label>
                <input
                    multiple={true}
                    name="ingredient"
                    onChange={onChange}
                    value={recipe.ingredients}
                />
                <br />
                <label>Instructions</label>
                <input name="instructions" value={recipe.instructions} type="text" />
                <br />
                <label>Video instruction</label>
                <input name="youtube" value={recipe.youtube} type="text" />
                <br />
                <label>Recipe Picture</label>
                <br />
                <input
                    type="file"
                    value={recipe.imageUrl}
                    name="imageUrl"
                    accept="image/png, image/jpg"
                />{" "}
                <br />
                <label>Decription</label>
                <input
                    name="description"
                    type="textarea"
                    multiple={true}
                    value={recipe.description}
                />
                <br />
                <label>Cooking Time</label>
                <input
                    name="cookingTime"
                    value={recipe.cookingTime}
                    type="number"
                    placeholder="cooking time in minutes, eg.60"
                />
                <span>min</span>
                <br />
                <label>Difficulty</label>
                <select name="difficulty">
                    <option name="difficulty" value="Easy">
                        Easy
          </option>
                    <option name="difficulty" value="Medium">
                        Medium
          </option>
                    <option name="difficulty" value="Hard">
                        Hard
          </option>
                </select>
                <br />
                <label>Country</label>
                <input name="country" value={recipe.country} type="text" />
                <br />
                <label>Category</label>
                <select name="category">
                    <option value="Main Course">Main Course</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Side dish">Side dish</option>
                    <option value="Dessert">Dessert</option>
                </select>
                <br />
                <label>Vegetarian ? </label>
                <label>
                    {" "}
                    <input
                        type="radio"
                        name="vegetarian"
                        value="true"
                        onChange={onRadio}
                    />
          Yes
        </label>
                <label>
                    <input
                        type="radio"
                        name="vegetarian"
                        value="false"
                        onChange={onRadio}
                    />
          No
        </label>
                <br />
                <button type="submit"> submit</button>
            </form>
        </div>
    );
}

export default EditForm;
