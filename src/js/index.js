//API key: 07dd95208f5ca6a6f32bc77083051683 
//Search URL: https://www.food2fork.com/api/search
//Get URL: https://www.food2fork.com/api/get

// key: 07dd95208f5ca6a6f32bc77083051683
// q: (optional) Search Query (Ingredients should be separated by commas). If this is omitted top rated recipes will be returned.
// sort: (optional) How the results should be sorted. See Below for details.
// page: (optional) Used to get additional results

import Search from './models/Search';

//Global State
//  -Search Object
//  -Current Recipe Object
//  -Shopping List Object
//  -Liked Recipes
const state = {};

const controlSearch = async () => {
    // 1. Get query from UI
    const query = 'pizza' //TESTING - PLEASE UPDATE

    if (query) {
        //2. Create new search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for Results

        //4. Search for recipes
        await state.search.getResults();

        //5. Display results to UI
    }
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();

});

search.getResults();