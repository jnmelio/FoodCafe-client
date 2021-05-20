import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Select, TextField } from "@material-ui/core";







// EDIT FORM COMES FROM A LINK IN RECIPE DETAILS.JS + A ROUTE IN APP.JS
function EditForm(props) {
    const [fetching, updateFetching] = useState(true);
    // const [recipe, updateRecipe] = useState({})
    const { onEdit, updateRecipe, recipe, onChange, onRadio, user, trueFalse } = props;


    useEffect(() => {
        let recipeId = props.match.params.recipeId;

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
    }, [props.match.params.recipeId, updateRecipe]);

    const handleNameChange = (event) => {
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.name = text
        updateRecipe(cloneRecipe)
        console.log(recipe)
    }
    const handleIngredients = (event) => {
        let text = event.target.value
        props.onType(event)
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.ingredients = text
        updateRecipe(cloneRecipe)
        console.log(recipe)
    }
    const handleInstructions = (event) => {
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.instructions = text
        updateRecipe(cloneRecipe)
    }
    const handleVideoChange = (event) => {
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.youtube = text
        updateRecipe(cloneRecipe)
    }
    const handlePictureChange = (event) => {
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.picture = text
        updateRecipe(cloneRecipe)
    }
    const handleDecriptionChange = (event) => {
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.description = text
        updateRecipe(cloneRecipe)
    }
    const handleCookingTime = (event) => {
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.cookingTime = text
        updateRecipe(cloneRecipe)
    }

    const handleCountryChange = (event) => {
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.country = text
        updateRecipe(cloneRecipe)
    }
    const handleCategoryChange = (event) => {
        console.log(event.target.value)
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.category = text
        updateRecipe(cloneRecipe)
    }
    const handleDifficulty = (event) => {
        console.log(event.target.value)
        let text = event.target.value
        let cloneRecipe = JSON.parse(JSON.stringify(recipe))
        cloneRecipe.difficulty = text
        updateRecipe(cloneRecipe)
    }


    if (fetching) {
        return <p>Loading ....</p>
    }
    return (
        <div className='allRecipes'>

            <div style={{ maxWidth: '600px', fontSize: 'smaller' }} className='recipeCard'>
                <h1>Edit this Recipe</h1>
                <TextField className='formlabels' label="Name"
                    variant="outlined" name="name" type="text"
                    onChange={handleNameChange} value={recipe.name} />
                <br />
                <br />
                <TextField className='formlabels' id="outlined-multiline-static" rows={4} multiline variant="outlined"
                    multiple={true}
                    label="Ingredients"
                    name="ingredient"
                    onChange={handleIngredients} value={recipe.ingredients}
                />
                <br />
                <br />
                <TextField className='formlabels'
                    id="outlined-multiline-static"
                    rows={4} multiline variant="outlined"
                    label="Instructions" name="instructions"
                    onChange={handleInstructions} value={recipe.instructions} type="text" />
                <br />
                <br />
                <TextField className='formlabels' id="outlined-basic" label="Video instruction"
                    variant="outlined" name="youtube" onChange={handleVideoChange}
                    value={recipe.youtube} type="text" />
                <br />
                <br />
                <label >Recipe Picture</label>
                <br />
                <input className='formlabels'
                    type="file"
                    onChange={handlePictureChange} value={recipe.imageUrl}
                    name="imageUrl"
                    accept="image/png, image/jpeg"
                />{" "}
                <br />
                <br />
                <TextField className='formlabels' id="outlined-multiline-static"
                    rows={4} multiline variant="outlined"
                    label="description"
                    name="description"
                    type="textarea"
                    multiple={true}
                    onChange={handleDecriptionChange} value={recipe.description}
                />
                <br />
                <br />

                <TextField
                    className='formlabels'
                    id="outlined-number"
                    label="Cooking Time in minutes, eg.60"
                    InputProps={{ inputProps: { min: 1 } }}
                    variant="outlined"
                    name="cookingTime"
                    onChange={handleCookingTime} value={recipe.cookingTime}
                    type="number"
                    placeholder="cooking time in minutes, eg.60"

                />
                <br />
                <br />
                <FormControl className='formlabels' variant="outlined" >
                    <InputLabel htmlFor="outlined-age-native-simple">Difficulty</InputLabel>
                    <Select
                        value={recipe.difficulty}
                        native
                        onChange={handleDifficulty}
                        label="Difficulty"
                        inputProps={{
                            name: 'difficulty',
                            id: 'outlined-age-native-simple',
                        }}>
                        <option value="Easy"> Easy</option>
                        <option value="Medium"> Medium </option>
                        <option value="Hard"> Hard </option>
                    </Select>
                </FormControl>
                <br />
                <br />

                <TextField className='formlabels' id="outlined-basic"
                    label="Country" variant="outlined"
                    name="country" onChange={handleCountryChange}
                    value={recipe.country} type="text" />
                <br />
                <br />
                <FormControl className='formlabels' variant="outlined" >
                    <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                    <Select onChange={handleCategoryChange}
                        native
                        value={recipe.category}
                        label="Category"
                        inputProps={{
                            name: 'category',
                            id: 'outlined-age-native-simple',
                        }}>
                        <option value="Main Course">Main Course</option>
                        <option value="Seafood">Seafood</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Side dish">Side dish</option>
                        <option value="Dessert">Dessert</option>
                    </Select>
                </FormControl>
                <br />

                <FormControl className='formlabels' component="fieldset">
                    <FormLabel component="legend">Vegetarian</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Yes"
                            labelPlacement="start"
                            type="radio"
                            name="vegetarian"
                            onChange={onRadio}
                        />
                        <FormControlLabel type="radio"
                            name="vegetarian"
                            onChange={onRadio} value="false" control={<Radio color="primary" />}
                            labelPlacement="start" label="No" />
                    </RadioGroup>
                </FormControl>
                <br />
                <div className='formlabels' ><button onClick={onEdit} > Update</button></div>

            </div>
        </div >
    );
}
export default EditForm;