import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EcoTwoToneIcon from '@material-ui/icons/EcoTwoTone';

function Home(props){
    const {recipes} = props
    console.log(recipes)
    return (
<div>
    <p>Description</p>
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {recipes.map((recipe) => {
          return <div style={{ maxWidth: '300px', margin: '20px', border: 'solid', padding: '20px' }} >
            <div >
              <Link key={recipe._id} to={`/recipe-details/${recipe._id}`}>
                <h3>{recipe.vegetarian && <span><EcoTwoToneIcon /></span>}{recipe.name}</h3>

                <img style={{ maxWidth: '260px' }}
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