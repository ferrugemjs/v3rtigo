const v3rtigo = require('./dist/commonjs/store');

class CountStore extends v3rtigo.Store{
    constructor(){
        super();
        this.state = 10;
    }
    increment(){
        this.setState(this.getState() + 1);
    }
}

const countStore = new CountStore();

console.log(countStore.getState());
countStore.increment();
console.log(countStore.getState());