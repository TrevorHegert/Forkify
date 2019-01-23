//API key: 07dd95208f5ca6a6f32bc77083051683
//Search URL: https://www.food2fork.com/api/search
//Get URL: https://www.food2fork.com/api/get

// key: 07dd95208f5ca6a6f32bc77083051683
// q: (optional) Search Query (Ingredients should be separated by commas). If this is omitted top rated recipes will be returned.
// sort: (optional) How the results should be sorted. See Below for details.
// page: (optional) Used to get additional results

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
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
    //////////////////////////////////////////////////////////////////PLEASE REMOVE FROM FINAL CODE    
    const query = 'pizza';
    //////////////////////////////////////////////////////////////////PLEASE REMOVE FROM FINAL CODE    

    //const query = searchView.getInput();                        PLEASE RESTORE IN FINAL CODE

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

/////////////////////////////////////////////////////////////////////PLEASE REMOVE IN FINAL CODE
//Load Search Results on Page Load for Testing 
window.addEventListener("load", e => {
    e.preventDefault();
    controlSearch();
});
/////////////////////////////////////////////////////////////////////PLEASE REMOVE IN FINAL CODE

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

        //Create new recipe object
        state.recipe = new Recipe(id);

        //TESTING
        window.r = state.recipe;

        try {
            //Get recipe data
            await state.recipe.getRecipe();

            //Call calcTime & calcServings
            state.recipe.calcServings();
            state.recipe.calcTime();

            //Render Recipe
            console.log(state.recipe);
        } catch (error) {
            alert('Error Processing Recipe');
        };

    };
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));