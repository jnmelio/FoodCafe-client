import React from "react";
import { Link } from "react-router-dom";
import EcoTwoToneIcon from '@material-ui/icons/EcoTwoTone';

function Home(props) {
  const { recipes } = props
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/alt-text*/}
      <Link to='/' ><img src="logo-without-background-tall.png" className="logoHome"></img></Link>

      <p className="description">FoodCafe is a place for all the foodies around the world! <br />Sign up to our app and have access to some delicious recipes from all over the world!</p>
      <section className='allRecipes'>
        {recipes.map((recipe) => {
          return <div className='recipeCard backgroundCard'>
            <div >
              <Link key={recipe._id} to={`/recipe-details/${recipe._id}`}>
                <h3>{recipe.vegetarian && <span><EcoTwoToneIcon style={{ color: 'green' }} /></span>}{recipe.name}</h3>

                <img style={{ maxWidth: '260px', maxHeight: '260px', height: '100%' }}
                  alt={recipe.name} src={recipe.picture} />
              </Link>
            </div>
          </div>
        })
        }
      </section>
    </div>
  )
}

export default Home