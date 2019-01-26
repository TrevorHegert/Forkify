import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    additem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient,
        }
    }
}