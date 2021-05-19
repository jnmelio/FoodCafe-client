import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'

function MyRecipes(props) {
    const [user, updateUser] = useState(null)
    const [fetching, updateFetching] = useState(true)


    useEffect(() => {
        axios.get(`${config.API_URL}/api/timeline`, { withCredentials: true })
            .then((res) => {
                updateUser(res.data)
                updateFetching(false)
            })
    }, []);


    if (fetching) {
        return <p>Loading . . .</p>;
    }
    return (
        <div className={` container`}>
            <section style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {user.recipe.map((recipe) => {
                    return <div className='recipeCard' >
                        <div >
                            <Link key={recipe._id} to={`/recipe-details/${recipe._id}`}>
                                <h3>{recipe.name}</h3>
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
export default MyRecipes