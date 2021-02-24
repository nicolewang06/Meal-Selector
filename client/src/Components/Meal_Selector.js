import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Meal_Selector() {

    const [recipe, setRecipes] = useState(null);

    async function getRecipes() {
        try {
            const res = await axios.get('https://calm-atoll-21972.herokuapp.com/recipes');
            const recipeNum = Math.floor(Math.random() * res.data.length);
            const randomRecipe = res.data[recipeNum];
            // console.log(randomRecipe);
            setRecipes(randomRecipe);
        } catch(e) {
            console.error(e, e.message);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        getRecipes();
    }

    return(
        <div>
            <button onClick= { (e) => handleSubmit(e)} className="selector-button">Meal Selector</button>
            { recipe && <Recipe recipe= { recipe } key= { recipe.id }/>}
        </div>
    )
}

function Recipe({ recipe }) {
    return(
        <div className="recipe">
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
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><a id="recipeUrl" href={ recipe.url }>{ recipe.url }</a></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        
    )
}

export default Meal_Selector;