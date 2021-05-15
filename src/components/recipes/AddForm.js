import React, { useState, useEffect } from 'react'

function AddForm() {
    const [inputList, setInputList] = useState([]);
    let array = []
    const handleSubmit = () => {
        console.log(array)
    }

    const handleOnChange = (e) => {
        e.preventDefault()
        let ingredient = e.target.value

        setInputList(...inputList, [ingredient.split(',')])

    };

    return (
        <div>
            <h1>Add a new Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input name='name' type='text' /><br />
                <label>Ingredients</label>
                {
                    inputList.map((x, i) => {
                        return x
                    })

                }

                <input multiple={true} name='ingredient' onChange={handleOnChange} />
                <button type='submit'> submit</button>
            </form>
        </div>
    )
}

export default AddForm