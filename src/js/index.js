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
    const query = searchView.getInput();

    if (query) {
        //2. Create new search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for Results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResultList);

        //4. Search for recipes
        await state.search.getResults();

        //5. Display results to UI
        clearLoader();
        searchView.renderResults(state.search.result);
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

const r = new Recipe(46956);
r.getRecipe();
console.log(r);