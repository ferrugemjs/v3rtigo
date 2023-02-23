# V3rtigo

V3rtigo is a state management library for [Ferrugemjs](https://ferrugemjs.github.io/home-page/) applications.

[![NPM](https://nodei.co/npm/@ferrugemjs/v3rtigo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@ferrugemjs/v3rtigo/)

### install

```
npm install v3rtigo --save
```

## usage

### create a store

eg. stores/count.js
``` javascript
import { Store } from '@ferrugemjs/v3rtigo';

class CountStore extends Store{
    constructor(){
        super();
        this.state = 1;
    }
    public increment(){
        this.setState( this.getState() + 1 );
    }
}

export default new CountStore();

```

### import store into component

eg. app/hello-world.js
``` javascript
import countStore from "../stores/count";

export class HelloWorld{
  get count(){
    return countStore.getState();
  }
  incrementHandler(){
    countStore.increment();
  }
  storeChangeHandler(){
    // react to change
  }
}

```

### connect-provider componente

eg. app/hello-world.html

``` xml
<template>
  <require from="@ferrugemjs/v3rtigo as v3r" type="namespace"/>
  <require from="../stores/count as countStore" type="script"/>
  <div>
    <h4>${this.count}</h4>
    <button click.trigger="this.incrementHandler"/>
    <v3r:connect-provider
      stores="${[countStore.default]}"
      store-change.handler="this.storeChangeHandler"
    />
  </div>
</template>
```

### With commonjs
``` js
const v3rtigo = require('@ferrugemjs/v3rtigo/dist/commonjs/store');

class CountStore extends v3rtigo.Store{
  
}
export default new CountStore();
```

- **stores** : a list of stores which will be connected (obrigatory).

### Store methods

#### dispatch
``` javascript
let payload = {desc: 'a basic info!'};
store.dispatch('storeMethod', payload);
store.dispatch({type: 'storeMethod' , payload});
```

#### subscribe
``` javascript
store.subscribe('storeMethod', payload => {
  console.log('subscribe working', payload);
});
```

#### unsubscribe
``` javascript
let unsub = store.subscribe('storeMethod', payload => {
  console.log('subscribe working once time ', payload);
  unsub();
});
```

#### emit (it's a store protected method)
``` javascript
...
  save(item){
    ...
    this.emit('item:saved', item);
  }
...
```