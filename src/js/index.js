//API key: 07dd95208f5ca6a6f32bc77083051683
//Search URL: https://www.food2fork.com/api/search
//Get URL: https://www.food2fork.com/api/get

// key: 07dd95208f5ca6a6f32bc77083051683
// q: (optional) Search Query (Ingredients should be separated by commas). If this is omitted top rated recipes will be returned.
// sort: (optional) How the results should be sorted. See Below for details.
// page: (optional) Used to get additional results

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";

//Global State
//  -Search Object
//  -Current Recipe Object
//  -Shopping List Object
//  -Liked Recipes
const state = {};

//SEARCH CONTROLLER
const controlSearch = async () => {
    // 1. Get query from UI
    const query = searchView.getInput();

    if (query) {
        //2. Create new search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for Results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResultList);

        try {
            //4. Search for recipes
            await state.search.getResults();

            //5. Display results to UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (error) {
            alert('Error Processing Search');
            clearLoader();
        };
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


//RECIPE CONTROLLER

const controlRecipe = async () => {
    //Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        //Prepare UI for Changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);
        //console.log(state.recipe);

        try {
            //Get recipe data and parse Ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Call calcTime & calcServings
            state.recipe.calcServings();
            state.recipe.calcTime();

            //Render Recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error Processing Recipe');
        };

    };
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//List Controller
const controlList = () => {
    //Create a New List if there is not one already
    if (!state.list) state.list = new List();

    //Add each ingredient to the list and user interface
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

//Handling the recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //Decrease Button is Clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //Increase Button is Clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    };
});

window.l = new List();