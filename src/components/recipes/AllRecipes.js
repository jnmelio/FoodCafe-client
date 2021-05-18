import React from "react";
import { Link } from "react-router-dom";
import EcoTwoToneIcon from '@material-ui/icons/EcoTwoTone';

//ALLRECIPES COMES FROM A LINK IN APP.JS AND A ROUTE IN APP.JS
function AllRecipes(props) {
  const { recipes } = props;
  // let random = Math.floor(Math.random() * props.recipes.length);
  // // let recipeId = recipes[random].params.id
  // let recipeId = recipes[random]._id;

  return (
    <div>

      <section className='allRecipes' >
        {recipes.map((recipe) => {
          return <div className='recipeCard'  >
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
  );
}

export default AllRecipes;
