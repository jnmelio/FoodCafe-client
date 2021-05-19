import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'
import { Avatar } from '@material-ui/core';



export default function Profile(props) {
    const [user, updateUser,] = useState(null);
    const [fetching, updateFetching] = useState(true);
    const [posts, updateMyPosts] = useState([]);

    useEffect(() => {
        axios
            .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
            .then((response) => {
                updateUser(response.data);
                return axios.get(`${config.API_URL}/api/posts`, { withCredentials: true })
            })
            .then((response) => {
                updateMyPosts(response.data.reverse())
                updateFetching(false);
            })
            .catch(() => {
                console.log("Fetching failed");
            });
    }, []);



    if (fetching) {
        return <p>Loading . . .</p>;
    }

    return (
        <div>
            <div className='container'>
                <h3>My Posts</h3>
                {
                    posts.map((post) => {
                        return (
                            post?.user?._id === user._id &&
                            <div key={post?._id} className='post'>
                                <span></span><b><Avatar />{post.user.username}</b> <p>{post.description}</p><br />
                                {post.picture && <img src={post.picture} alt='recipe.png' />}

                                {post.recipe ?
                                    (post.recipe &&
                                        <p id='recipe-link' >I used:<Link key={post.recipe._id}
                                            to={`/recipe-details/${post.recipe._id}`}>
                                            <b>{' >> '}{post.recipe.name}{' << '}</b></Link> recipe</p>) : (<p>Find you recipe:
                                                <Link to="/recipes"><b>{' >> '}Recipes{' << '}</b></Link></p>)
                                } </div>
                        );
                    })
                }
            </div>
        </div>
    );
}