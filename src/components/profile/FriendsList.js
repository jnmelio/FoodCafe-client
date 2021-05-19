import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'
import { Avatar, Button } from '@material-ui/core';

export default function FriendsList(props) {

    const [friends, updateMyFriends] = useState(null)
    const [fetching, updateFetching] = useState(true);


    const handleChatClick = (chatUserId) => {
        const { user } = props;
        if (!user) {
            props.history.push("/signin");
        } else {
            let data = {
                participants: [chatUserId, user._id],
            };
            axios
                .post(`${config.API_URL}/api/conversation`, data, {
                    withCredentials: true,
                })
                .then((response) => {
                    props.history.push(`/chat/${response.data._id}`);
                });
        }
    };

    useEffect(() => {
        axios
            .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
            .then((response) => {

                updateMyFriends(response.data.myFriends)
                updateFetching(false);
            })
            .catch((err) => {
                console.log("Fetching failed", err);
            });
    }, []);


    if (fetching) {
        return <p>Loading . . .</p>;
    }
    return (
        <div className={` container`}>
            <main className='allRecipes'>
                {friends.map((friend) => {
                    return <div className='recipeCard ' >
                        <Button style={{ background: 'lightgreen', }}
                            onClick={() => { handleChatClick(friend._id); }}>
                            Chat
                     </Button>
                        <div >
                            <h3> <Avatar /> <>{friend.firstName}</><> {friend.lastName}</> </h3>
                            <h4>{friend.username} recipes:</h4>
                            {friend.recipe.map((singleRecipe) => {
                                return <Link to={`/recipe-details/${singleRecipe._id}`}>
                                    <p style={{ color: '#6985c0' }}>{singleRecipe.name}</p>
                                </Link>
                            })}
                            <div>
                            </div>
                        </div>
                    </div>
                })
                }
            </main>
        </div>
    );
}
