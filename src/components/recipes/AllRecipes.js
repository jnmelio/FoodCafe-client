import React from 'react'
import { Link } from 'react-router-dom'


function AllRecipes(props) {
    const { recipes } = props
    let random = Math.floor(Math.random() * props.recipes.length)
    // let recipeId = recipes[random].params.id
    let recipeId = recipes[random]._id

    return (
        <div>
            <Link to={`/recipe-details/${recipeId}`}>Random recipe</Link>
            {
                recipes.map((recipe) => {
                    return <Link key={recipe._id} to={`/recipe-details/${recipe._id}`}>
                        <div>{recipe.name}</div>
                    </Link>
                })
            }
        </div>
    )
}

export default AllRecipes