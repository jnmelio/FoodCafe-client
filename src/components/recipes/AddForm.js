import { TextareaAutosize } from '@material-ui/core'
import React from 'react'


// ADDFORM COMES FROM THE LINK ADD A RECIP IN APP.JS AND A ROUTE IN APP.JS
function AddForm(props) {
  const { onChange, onSubmit, onRadio } = props

  return (
    <div>
      <h1>Add a new Recipe</h1>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input name='name' type='text' /><br />
        <label>Ingredients</label>
        <input multiple={true} name='ingredient' onChange={onChange} /><br />
        <label>Instructions</label><br />
        <TextareaAutosize aria-label="maximum height" rowsMin={5} rowsMax={5} placeholder="Instructions" name='instructions' type='text' />
        <br />
        <label>Video instruction</label>
        <input name='youtube' type='text' /><br />

        <label>Recipe Picture</label><br />
        <input type="file" name="imageUrl" accept="image/png, image/jpeg" />

        <label>Decription</label>
        <input name='description' type='textarea' multiple={true} /><br />
        <label>Cooking Time</label>
        <input name='cookingTime' type='number' placeholder='cooking time in minutes, eg.60' /><span>min</span><br />

        <label>Difficulty</label>
        <select name='difficulty'>
          <option name='difficulty' value="Easy">Easy</option>
          <option name='difficulty' value="Medium">Medium</option>
          <option name='difficulty' value="Hard">Hard</option>
        </select><br />
        <label>Country</label>
        <input name='country' type='text' /><br />
        <label>Category</label>
        <select name='category'>
          <option value="Main Course">Main Course</option>
          <option value="Seafood">Seafood</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Side dish">Side dish</option>
          <option value="Dessert">Dessert</option>
        </select><br />
        <label>Vegetarian ? </label>
        <label> <input type="radio" name="vegetarian" value='true' onChange={onRadio} />Yes</label>

        <label><input type="radio" name="vegetarian" value='false' onChange={onRadio} />No</label>

        <br />
        <button type='submit'> submit</button>
      </form>
    </div>
  )
}

export default AddForm;
