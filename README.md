# FoodCafe

<br>
## Description

This project is about creating a nice environment for people to connect around the common interest of food.

<br>

## User Stories

- 404: As a user/premium user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- Signup: As a user/premium user I can sign up in the platform so that I can start accessing my profile, talk with other users and share my recipes
- Login: As a user/premium user I can login to the platform so that I can start accessing my profile, talk with other users and share my recipes
- Logout: As a user/pPremium user I can logout from the platform so no one else can modify my information
- Add elements :  As a premium user I can add recipes to the database
- Delete elements As a premium user I can delete the recipes I created
- Edit elements : As a premium user I can edit the recipes I created
- Message : As a user/premium user I can talk to other users with private messages
- Random element As a user/ premium user I can access a random recipe 
- Check profile As a user/premium user I can check my profile and modify my account info. I can see my calendar of planning recipes
- Recipe Details : As a user/premium user I can access the details of each recipe
- Timeline : As a user/premium user I can see a timeline of other people recipes and search for some

<br>

## Backlog

- Payment method
- Style addition
- Map for recipes all over the world

<br>

# Client/Frontend

## React Router Routes (React app)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | Home                    | public `<Route>`            | Home page, signin, signup                                        |
| `/signup`                 | SignUp                     | public  `<Route>`    | Offer to add recipes to profile and redirect to the timeline once done |
| `/logout`                 | n/a                            | user/premium only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |
| `/yourfeed`         | NavBar, Timeline, FriendsList, Search, FooterBar | user/premium only `<PrivateRoute>`  | Shows user timeline, his friends, and display the search bar                            |
| `/profile`          | NavBar, Calendar, FriendsList, MyRecipes, FooterBar | user/premium only `<PrivateRoute>`  | Shows the profile                     |
| `/recipe-details/:id`          | NavBar, RecipeDetails, FooterBar | user/premium only `<PrivateRoute>`  | Shows all details for a recipe
| `/random-recipe/:id`          |  NavBar, RandomRecipe, FooterBar    | user/premium only  `<PrivateRoute>` | See a random recipe                     |
| `/messenger`           | NavBar, RecipeDetails, FooterBar      | user/premium only `<PrivateRoute>`  | Open conversation with friends                                     |
| `/add-a-recipe`           | NavBar, AddForm, FooterBar      | premium only `<PrivateRoute>`  | Create a recipe                                 |
| `/edit-a-recipe/:id`                | NavBar, EditForm, FooterBar                    | premium only `<PrivateRoute>`  | Edit an element you created                               |
| `/recipes`                | NavBar, AllRecipes, FooterBar                 | public  `<Route>` | Check all the recipes   and redirect to signin/signup if user wants to access the details                      |

<br>

## Components

- Home
- RandomRecipe
- SignUp
- NavBar
- Timeline
- FriendsList
- Search
- FooterBar
- Calendar
- MyRecipes
- RecipeDetails
- RandomRecipe
- AddForm
- EditForm
- AllRecipes

<br>

## Services

- External API
    - API about food

<br>

# Server / Backend

## Models

- User Model
          
```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  usertype: ,
  picture: String, 
}
```

- Recipe Model

```javascript
{
  name: {type: String, required: true},
  ingredients: {type: String, required: true},
  instructions: {type: String, required: true},
  youtube: String,
  picture: String, 
  description: {type: String, required: true}, 
  cookingTime: {type: String, required: true},
  difficulty: String, 
  createdBy: String, 
  country: String,
}
```
<br>
## API Endpoints

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {username, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session    |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| POST        | `/user/search`                 | {name, instructions, ingredients, country, youtube, photo, description, cookingTime, difficulty, createdBy}  |                | 400          | Search for a recipe                                    |
| POST         | `/recipe/add`             |                              |                | 400          | Add a recipe                              |
| DELETE        | `/recipe/delete/:id`             |                              |                |         | Delete a recipe                         |
| PATCH         | `/recipe/edit-recipe`             |                              |                | 400          | Edit a recipe                             |
| GET        | `/recipe/:id`             |                              |                | 400          | Recipe details                              |
| GET         | `/recipe/random`             |                              |                | 400          | get a random recipe                              |

<br>
## Links

### Git

[Client repository Link](https://github.com/jnmelio/FoodCafe-client)

[Server repository Link](https://github.com/jnmelio/FoodCafe-server)

### Slides


