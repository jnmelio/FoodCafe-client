import { FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Select, TextField } from '@material-ui/core'
import React from 'react'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// ADDFORM COMES FROM THE LINK ADD A RECIP IN APP.JS AND A ROUTE IN APP.JS
function AddForm(props) {
  const { onSubmit, onRadio } = props
  return (
    <div className='allRecipes'>
      <ToastContainer />
      <div style={{ maxWidth: '600px' }} className='recipeCard allRecipes'>
        <h1>Add a new Recipe</h1>
        <form className='formlabels' onSubmit={onSubmit}>
          <TextField className='formlabels' label="Name of recipe*" variant="outlined" name="name" type="text" />
          <br /><br />
          <TextField className='formlabels' id="outlined-multiline-static" rows={4} multiline variant="outlined"
            multiple={true}
            label="Ingredients(separate them by comma. e.g. 8 Peppers, Salt,etc.)*"
            placeholder='Ingredients are separated by a comma (,)'
            name="ingredient"
          /><br /><br />
          <TextField className='formlabels' id="outlined-multiline-static" rows={4} multiline variant="outlined"
            label="Instructions*" name="instructions" type="text"
            placeholder='Show a step by step guide for this recipe' />  <br /><br />

          <TextField className='formlabels' id="outlined-basic" label="Video instruction"
            variant="outlined" name="youtube"
            placeholder='Paste a link to the video of this recipe(optional)' type="text" />
          <br />
          <br />

          <label>Recipe Picture(optional)</label><br />
          <input className='formlabels' type="file" name="imageUrl" accept="image/png, image/jpeg" />

          <TextField className='formlabels' id="outlined-multiline-static"
            rows={4} multiline variant="outlined"
            label="Description*"
            name="description"
            type="textarea"
            multiple={true}
            placeholder='Describe your recipe, and what makes it special'
          />
          <br />
          <br />
          <TextField
            className='formlabels'
            id="outlined-number"
            label="Cooking Time in minutes, e.g.60*"

            InputProps={{ inputProps: { min: 1 } }}
            variant="outlined"
            name="cookingTime"
            type="number" min="1"
            placeholder="cooking time in minutes, eg.60" />
          <br /><br />

          <FormControl className='formlabels' variant="outlined" >
            <InputLabel htmlFor="outlined-age-native-simple">Difficulty</InputLabel>
            <Select
              native
              label="Difficulty"
              inputProps={{
                name: 'difficulty',
                id: 'outlined-age-native-simple',
              }}>
              <option value="Easy"> Easy</option>
              <option value="Medium"> Medium </option>
              <option value="Hard"> Hard </option>
            </Select>
          </FormControl>
          <br />
          <br />
          <TextField className='formlabels' id="outlined-basic"
            label="Country" variant="outlined"
            name="country" type="text" placeholder=" e.g.China" />
          <br />
          <br />
          <FormControl className='formlabels' variant="outlined" >
            <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
            <Select native label="Category"
              inputProps={{
                name: 'category',
                id: 'outlined-age-native-simple',
              }}>
              <option value="Main Course">Main Course</option>
              <option value="Seafood">Seafood</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Side dish">Side dish</option>
              <option value="Dessert">Dessert</option>
            </Select>
          </FormControl>
          <br /><br />
          <FormControl className='formlabels' component="fieldset">
            <FormLabel component="legend">Vegetarian</FormLabel>
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Yes"
                labelPlacement="start"
                type="radio"
                name="vegetarian"
                onChange={onRadio}
              />
              <FormControlLabel type="radio"
                name="vegetarian"
                onChange={onRadio} value="false" control={<Radio color="primary" />}
                labelPlacement="start" label="No" />
            </RadioGroup>
          </FormControl>
          <br />

          <br />
          <button type='submit'> Create Recipe</button>
        </form>
      </div>
    </div>
  )
}

export default AddForm;
