import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateRecipe() {
    const [recipe, setRecipes] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setRecipes({... recipe, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        createRecipe();
    }

    async function createRecipe() {
        try {
            const res = await axios.post('https://calm-atoll-21972.herokuapp.com/recipes', recipe);
            console.log(res.data);
            setRecipes([res.data]);
        } catch(e) {
            console.error(e, e.message);
        }
    }

    return(
        <div>
            <form 
                className='recipe-form'
                onChange={ (e) => handleChange(e) }
                onSubmit={ (e) => handleSubmit(e) }>
            <table>
                <tr>
                    <td id="column">Name:</td>
                    <td><input type="text"size="50" name="name" /></td>
                </tr>
                <tr>
                    <td id="column">Cuisine:</td>
                    <td><input type="text" size="50"name="cuisine" /></td>
                </tr>
                <tr>
                    <td id="column">Ingredient 1: </td>
                    <td><input type="text"size="50" name="ingredient1" /></td>
                </tr>
                <tr>
                    <td id="column">Ingredient 2: </td>
                    <td><input type="text" size="50"name="ingredient2" /></td>
                </tr>
                <tr>
                    <td id="column">Ingredient 3: </td>
                    <td><input type="text"size="50" name="ingredient3" /></td>
                </tr>
                <tr>
                    <td id="column">Ingredient 4: </td>
                    <td><input type="text" size="50"name="ingredient4"/></td>
                </tr>
                <tr>
                    <td id="column">Ingredient 5: </td>
                    <td><input type="text" size="50"name="ingredient5" /></td>
                </tr>
                <tr>
                    <td id="column">URL:</td>
                    <td><input type="text" size="50" name="url" /></td>
                </tr><br></br>
                <tr>
                    <td colSpan="2"><input type="submit" value="Submit Recipe" className = "selector-button" /></td>
                </tr>
            </table>
                
            </form>
        </div>


    )
}

export default CreateRecipe;