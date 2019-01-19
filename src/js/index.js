//API key: 07dd95208f5ca6a6f32bc77083051683 
//Search URL: https://www.food2fork.com/api/search
//Get URL: https://www.food2fork.com/api/get

// key: 07dd95208f5ca6a6f32bc77083051683
// q: (optional) Search Query (Ingredients should be separated by commas). If this is omitted top rated recipes will be returned.
// sort: (optional) How the results should be sorted. See Below for details.
// page: (optional) Used to get additional results

import axios from 'axios';

async function getResults(query) {
    const proxy = 'https://cors.io/?';
    const key = '07dd95208f5ca6a6f32bc77083051683';
    try {
        const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = result.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }

}

getResults('instant');