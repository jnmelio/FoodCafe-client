/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import { Card, CardHeader, CardMedia, IconButton } from '@material-ui/core'

function RecipeDetails(props) {

    const [recipe, updateRecipe] = useState({})
    const [fetching, updateFetching] = useState(true)
    const { recipes, onDelete } = props
    let random = Math.floor(Math.random() * props.recipes.length)
    let recipeId = recipes[random]._id
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
            axios.get(`${config.API_URL}/api/recipe/${recipeId}`, { withCredentials: true })
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
                <div> <b>Created By:</b> {recipe.created_by}</div>
                <div> <b>Country :</b> {recipe.country}</div>
                <div> <b>Category :</b> {recipe.category}</div>

            </Card>
        </div >
    )
}


export default RecipeDetails