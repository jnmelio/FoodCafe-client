import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { Avatar } from "@material-ui/core";

export default function Profile(_props) {
  const [user, updateUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [friends, updateMyFriends] = useState(false);
  const [fetching, updateFetching] = useState(true);
  const [posts, updatePosts] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/timeline`, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        updateMyFriends(response.data.myFriends);
        return axios.get(`${config.API_URL}/api/posts`, {
          withCredentials: true,
        });
      })
      .then((response) => {
        updatePosts(response.data.reverse());
        updateFetching(false);
      })
      .catch(() => {
        console.log("Fetching failed");
      });
  }, [updateUser]);

  if (fetching) {
    return <p>Loading . . .</p>;
  }
  return (
    <div>
      <div id="profileInfo">
        {user.picture ? <img
          className="profilePicture"
          src={user.picture}
          alt={user.username}
        ></img> : <Avatar style={{ margin: '20px' }} />}
        <div>
          {" "}
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <br />
          <p>e-mail address : {user.email} </p>
        </div>
      </div>
      <div className="container">
        <h3>My Posts</h3>
        {posts.map((post) => {
          return (
            post?.user?._id === user._id && (
              <div key={post?._id} className="post">
                <span></span>
                <b>
                  <Avatar />
                  {post.user.username}
                </b>{" "}
                <p>{post.description}</p>
                <br />
                {post.picture && <img src={post.picture} alt="recipe.png" />}
                {post.recipe ? (
                  post.recipe && (
                    <p id="recipe-link">
                      I used:
                      <Link
                        key={post.recipe._id}
                        to={`/recipe-details/${post.recipe._id}`}
                      >
                        <b>
                          {" >> "}
                          {post.recipe.name}
                          {" << "}
                        </b>
                      </Link>{" "}
                      recipe
                    </p>
                  )
                ) : (
                  <p>
                    Find you recipe:
                    <Link to="/recipes">
                      <b>
                        {" >> "}Recipes{" << "}
                      </b>
                    </Link>
                  </p>
                )}{" "}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
