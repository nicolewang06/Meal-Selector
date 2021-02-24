import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recipes() {
    const [recipes, setRecipes] = useState(null);

    async function getRecipes() {
        try {
            const res = await axios.get('https://calm-atoll-21972.herokuapp.com/recipes');
            setRecipes(res.data);
        } catch(e) {
            console.error(e, e.message);
        }
    }

    useEffect(() => {
        getRecipes();
    }, [])

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    function selectRecipe(recipe, e) {
        e.preventDefault();
        setSelectedRecipe(recipe);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setSelectedRecipe({ ...selectedRecipe, [name]: value });
    }

    async function editRecipe(e) {
        e.preventDefault();
        try {
            const res = await axios.patch('https://calm-atoll-21972.herokuapp.com/recipes', selectedRecipe);
            console.log(res.data);
            getRecipes();
        } catch(e) {
            console.error(e, e.message);
        }
    }

    async function deleteRecipe(recipeId, e) {
        e.preventDefault();
        try {
            const res = await axios.delete('https://calm-atoll-21972.herokuapp.com/recipes/' + recipeId);
            console.log(res.data);
            getRecipes();
        } catch (e) {
            console.error(e, e.message);
        }
    }

    return(
        <div>
            { selectedRecipe && <form
                className='edit-recipe-form'
                onChange={ (e) => handleChange(e) }
                onSubmit={ (e) => editRecipe(e) }>
                    <table id="recipesForm">
                        <tr>
                            <td id="column">Name:</td>
                            <td><input type="text" name="name" size="40" defaultValue = { selectedRecipe.name }/></td>
                        </tr>
                        <tr>
                            <td id="column">Cuisine:</td>
                            <td><input type="text" name="cuisine" size="40" defaultValue = { selectedRecipe.cuisine }/></td>
                        </tr>
                        <tr>
                            <td id="column">Ingredient 1: </td>
                            <td><input type="text" name="ingredient1" size="40" defaultValue = { selectedRecipe.ingredient1 }/></td>
                        </tr>
                        <tr>
                            <td id="column">Ingredient 2: </td>
                            <td><input type="text" name="ingredient2" size="40" defaultValue = { selectedRecipe.ingredient2 }/></td>
                        </tr>
                        <tr>
                            <td id="column">Ingredient 3: </td>
                            <td><input type="text" name="ingredient3" size="40" defaultValue = { selectedRecipe.ingredient3 }/></td>
                        </tr>
                        <tr>
                            <td id="column">Ingredient 4: </td>
                            <td><input type="text" name="ingredient4" size="40" defaultValue = { selectedRecipe.ingredient4 }/></td>
                        </tr>
                        <tr>
                            <td id="column">Ingredient 5: </td>
                            <td><input type="text" name="ingredient5" size="40" defaultValue = { selectedRecipe.ingredient5 }/></td>
                        </tr>
                        <tr>
                            <td id="column">URL:</td>
                            <td><input type="text" size="40" name="url" defaultValue = { selectedRecipe.url }/></td>
                        </tr><br></br>
                        <tr>
                            <td colSpan="2"><input type="submit" value="Edit Recipe" className="selector-button" /></td>
                        </tr>
                    </table>
            </form>}
            { recipes && recipes.map(recipe => <Recipe recipe= { recipe } selectRecipe = { selectRecipe } deleteRecipe = { deleteRecipe } key= { recipe.id }/>)}
        </div>
    )
}

function Recipe({ recipe, deleteRecipe, selectRecipe }) {
    return(
            <form id="recipeForm">
                <div id="recipe">
                    <div id="cuisine"><div id="cuisineName"> { recipe.cuisine }</div></div>
                    <div id="recipeDetailsContainer">
                        <div id="recipeDetails">
                            <div>{ recipe.name }</div>
                            <div>
                                <table id="ingredients">
                                    <tr>
                                        <td>☐ { recipe.ingredient1 }</td>
                                        <td>☐ { recipe.ingredient4 }</td>
                                    </tr>
                                    <tr>
                                        <td>☐ { recipe.ingredient2 }</td>
                                        <td>☐ { recipe.ingredient5 }</td>
                                    </tr>
                                    <tr>
                                        <td>☐ { recipe.ingredient3 }</td>
                                    </tr><br></br>
                                    <tr>
                                        <td colSpan="2"><a id="recipeUrl" href={ recipe.url }>{ recipe.url }</a></td>
                                    </tr><br></br>
                                    <tr>
                                        <td><button onClick={ (e) => selectRecipe(recipe, e) }>Edit Recipe</button></td>
                                        <td><button onClick={ (e) => deleteRecipe(recipe.id, e) }>Delete Recipe</button></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    )
}

export default Recipes;
