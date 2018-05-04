import { IStore } from './i-store';

export class ConnectProvider{
  public store:IStore<any>;
  private unSubs:Function[];
  private eventHandler: Function;
  public eventType: string;
  public event: { subscribe: Function};
  constructor(){
    this.event = {
      handler: (eventHandler: Function) => {
        this.eventHandler = eventHandler;
      }
    };
  }
  private attached(){
    if(this.eventHandler && this.store){
      this.unSubs = [];
      //this.stores.forEach( store => {
        this.unSubs.push(this.store.subscribe(this.eventType | 'state:changed', this.eventHandler ));
      //});
    }
    delete this.store;
    delete this.eventHandler;
    delete this.event;
  }
  private detached(){
    this.unSubs.forEach(unSub => unSub());
    this.unSubs.length = 0;
    this.unSubs = [];
    // this.stores.length = 0;
    // this.stores = [];
    // delete this.stateChanged;
    // delete this.eventHandler;
    // delete this.stores;
    delete this.unSubs;  
  }
}
