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
  );
}

export default AllRecipes;
