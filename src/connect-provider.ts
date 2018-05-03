import { IStore } from './i-store';

export class ConnectProvider{
  public stores:IStore<any>[];
  private unSubs:Function[];
  private eventHandler: Function;
  public stateChanged: { subscribe: Function};
  constructor(){
    this.stateChanged = {
      subscribe: (eventHandler: Function) => {
        this.eventHandler = eventHandler;
      }
    };
  }
  private attached(){
    if(this.eventHandler && this.stores){
      this.unSubs = [];
      this.stores.forEach( store => {
        this.unSubs.push(store.subscribe('state:changed', this.eventHandler ));
      });
    }
  }
  private detached(){
    this.unSubs.forEach(unSub => unSub());
    this.unSubs.length = 0;
    this.unSubs = [];
    this.stores.length = 0;
    this.stores = [];
    delete this.stateChanged;
    delete this.eventHandler;
    delete this.stores;
    delete this.unSubs;  
  }
}