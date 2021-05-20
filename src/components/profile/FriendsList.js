import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { Avatar, Button } from "@material-ui/core";


export default function FriendsList(props) {
  const [friends, updateMyFriends] = useState(false);
  const [fetching, updateFetching] = useState(true);
  const { user, recipes } = props;

  const handleChatClick = (chatUserId) => {
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
        updateMyFriends(response.data.myFriends);
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
      {/* eslint-disable-next-line jsx-a11y/alt-text*/}
      <Link to='/'><img src="/logo-without-background.png" class="logo"></img></Link>
      <div className={` container`}>

        <CssBaseline />

        <main className="allRecipes">
          {friends.map((friend) => {
            return (
              <div className="recipeCard ">
                <Button
                  style={{ background: "lightgreen" }}
                  onClick={() => {
                    handleChatClick(friend._id);
                  }}>
                  Chat
              </Button>
                <div>
                  <h3>
                    {" "}
                    <Avatar /> <>{friend.firstName}</>
                    <> {friend.lastName}</>{" "}
                  </h3>
                  <h4>{friend.username} recipes:</h4>
                  {friend.recipe.map((singleRecipe) => {
                    // eslint-disable-next-line array-callback-return
                    return recipes.map((rec) => {
                      if (rec._id === singleRecipe) {
                        return (
                          <Link to={`/recipe-details/${rec._id}`}>
                            <p style={{ color: "#6985c0" }}>{rec.name}</p>
                          </Link>
                        );
                      }
                    });
                  })}
                  <div></div>
                  <p></p>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
