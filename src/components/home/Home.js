import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EcoTwoToneIcon from '@material-ui/icons/EcoTwoTone';

function Home(props) {
  const { recipes } = props
  return (
    <div>

      <section className='allRecipes'>
        {recipes.map((recipe) => {
          return <div className='recipeCard'>
            <div >
              <Link key={recipe._id} to={`/recipe-details/${recipe._id}`}>
                <h3>{recipe.vegetarian && <span><EcoTwoToneIcon style={{ color: 'green' }} /></span>}{recipe.name}</h3>

                <img style={{ maxWidth: '260px', maxHeight: '260px', height: '100%' }}
                  alt={recipe.name} src={recipe.picture} />
              </Link>

              <p>{recipe.description}</p>

            </div>
          </div>
        })
        }
      </section>
    </div>
  )
}

export default Home