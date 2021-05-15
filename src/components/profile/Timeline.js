import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import config from '../../config'


function Timeline(props) {
  const { user, updateUser, recipes, updateRecipes } = props;
  const [fetching, updateFetching] = useState(true);
  // console.log('friends', user.myFriends);
  console.log('recipes', user)

// let myRecipes = recipes.filter((singleRecipe)=>{
//   return singleRecipe._id == user.recipe._id
// })
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
      .then((response) => {
        // console.log('resposne', response.data.recipe)
        updateUser(response.data);
        updateFetching(false)
        console.log(user)
      })
      .catch(() => {
        console.log("Fetching failed");
      });

      // user.recipe.map((element)=>{
      //   console.log(element._id)
      //   return (
      //     axios.get(`${config.API_URL}/api/recipe/${_id}`, { withCredentials: true })
      //     .then((response) => {
      //         console.log(response)
      //         updateRecipes(response.data)
      //         updateFetching(false)
      //     })
      //     .catch(() => {
      //         console.log('Detail fecth failed1')
      //     })
      //   )  
      // })
  }, []);

  if (fetching) {
    return <p>Loading . . .</p>;
  }


  return (
    <div>
      <h1>Timeline</h1>
      <p>{user.username}</p>
      <p>{user.myFriends}</p>
{
  user.recipe.map((singleRecipe)=>{
    return <p>{singleRecipe.name}</p>
  })
}
      
    </div>
  );
}

export default Timeline;
