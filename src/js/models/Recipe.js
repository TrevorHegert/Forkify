import axios from 'axios';
import {
    key,
    proxy
} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.imageURL = result.data.recipe.image_url;
            this.source = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
            // console.log(result);
        } catch (error) {
            console.log(error);
            alert('Something Went Wrong...  :(');
        }
    }

    calcTime() {
        //Rough Time Calculator Based on 15 min per 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}