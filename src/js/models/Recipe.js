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
        }
    }
}