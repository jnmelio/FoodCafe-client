import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";

function SignUpRandom(props) {
  const [randomRecipe, updateRandomRecipe] = useState([]);
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/signup`, {withCredentials: true})
      .then((response) => {
        console.log(response.data)
        updateRandomRecipe(response.data);
      })
      .catch(() => {});
  }, []);
  return (
    <div>
      <div>
      <h1>Random</h1>
        <h3>{randomRecipe.name}</h3>
      </div>
    </div>
  );
}

export default SignUpRandom;
