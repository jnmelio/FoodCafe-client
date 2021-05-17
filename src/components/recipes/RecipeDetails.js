/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import { Card, CardHeader, CardMedia } from '@material-ui/core'

//RECIPE DETAILS COMES FROM A LINK IN ALLRECIPES.JS AND A ROUTE IN APP.JS
function RecipeDetails(props) {

    const [recipe, updateRecipe] = useState(null)
    const [fetching, updateFetching] = useState(true)
    const { recipes, onDelete, user, updateUser } = props


    console.log(recipe)
    useEffect(() => {
        let recipeId = props.match.params.recipeId
        if (recipeId) {
            axios.get(`${config.API_URL}/api/recipe/${recipeId}`, { withCredentials: true })
                .then((response) => {
                    updateRecipe(response.data)
                    updateFetching(false)
                })
                .catch(() => {
                    console.log('Detail fecth failed')
                })
        }
        else {
            let random = Math.floor(Math.random() * props.recipes.length)
            let recId = recipes[random]._id
            axios.get(`${config.API_URL}/api/recipe/${recId}`, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    updateRecipe(response.data)
                    updateFetching(false)
                })
                .catch(() => {
                    console.log('Detail fecth failed1')
                })
        }
    }, [props.match.params.recipeId])

    // const { onDelete, user } = props
    if (fetching) {
        return <p>Loading ...</p>
    }

    const handleAddRecipeToList = () => {
        let id = props.match.params.recipeId
        console.log("props", props.match)
        console.log('id', id)
        console.log('recipeId', props.match.params.recipeId)
        axios
            .post(
                `${config.API_URL}/api/recipe/${id}`,
                {},
                { withCredentials: true }
            )
            .then((response) => {
                console.log("handle add recipe", response.data);
                updateUser(response.data);
            })
            .catch(() => { });
    };
    // const { onDelete, user } = props
    if (fetching) {
        return <p>Loading ...</p>;
    }

    return (
        <div className='container'>
            <Card style={{
                maxWidth: 700
            }}>
                <Link to={`/edit-a-recipe/${recipe._id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => { onDelete(recipe._id) }}>Delete</button>

                <CardHeader

                    title={recipe.name}
                    subheader={recipe.vegetarian && <b>Vegetarian</b>}
                />
                <CardMedia
                    style={{
                        height: '0',
                        paddingTop: '56.25%',
                    }}
                    image={recipe.picture}
                    title={recipe.name}
                />
                <div><b>Description:</b> {recipe.description}</div> <br></br>
                <div>{recipe.vegetarian && <b>Vegetarian</b>} </div>
                <div><b>Ingredients:</b>
                    {
                        recipe?.ingredients.map((ingredient, i) => {
                            return <ul key={i}>
                                <li>{ingredient}</li>
                            </ul>
                        })
                    } </div>
                <div> <b>Cooking Time:</b> {recipe.cookingTime} min</div>
                <div><b>Dificulty:<i> {recipe.difficulty}</i></b></div>
                <div>Video Instructions: <a href={recipe.youtube}>Click for video</a></div>
                <div> <b>Instructions:</b> {recipe.instructions}</div>
                <div> {recipe.created_by && <p> <b>Created By:</b> {recipe.created_by.username}</p>}</div>
                <div> <b>Country :</b> {recipe.country}</div>
                <div> <b>Category :</b> {recipe.category}</div>

            </Card>
        </div >
    )
}

export default RecipeDetails;
