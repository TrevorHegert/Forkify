import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors.io/?';
        const key = '07dd95208f5ca6a6f32bc77083051683';
        try {
            const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = result.data.recipes;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}