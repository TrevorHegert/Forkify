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

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const newIngredients = this.ingredients.map(el => {
            //1. Uniform unit names
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            //2. Remove unneeded punctuation
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //3. Parse Ingredients into Count, Unit and Ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;

            if (unitIndex > -1) {
                //There is a unit
            } else if (parseInt(arrIng[0], 10)) {
                //There is NO unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                //There is NO unit, and 1st element NOT a number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return ingredient;
        });
        this.ingredients = newIngredients;
    }




}