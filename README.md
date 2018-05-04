# V3rtigo

V3rtigo is a state management library for [Ferrugemjs](https://ferrugemjs.github.io/home-page/) applications.

[![NPM](https://nodei.co/npm/v3rtigo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ferrugemjs-loader/)

### install

```
npm install v3rtigo --save
```

## usage

### create a store

eg. stores/count.js
``` javascript
import { Store } from 'v3rtigo';

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
}

```

### connect-provider componente

eg. app/hello-world.html

``` xml
<template>
  <require from="v3rtigo as v3r" type="namespace"/>
  <require from="../stores/count as countStore" type="script"/>
  <div>
    <h4>${this.count}</h4>
    <button click.trigger="this.incrementHandler"/>
    <v3r:connect-provider 
        store="${countStore.default}" 
        event.handler="this.refresh"
    />
  </div>
</template>
```

### connect-provider properties

``` xml
<v3r:connect-provider 
   store="${countStore.default}" /// obrigatory
   event.handler="this.evtHandler" /// obrigatory
   event-type="other-store-event" /// optional, default is "state:changed"
/>
```
