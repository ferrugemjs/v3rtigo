import { IStore } from './i-store';

export class ConnectProvider{
  public store:IStore<any>;
  private unSubs:Function[];
  private eventHandler: Function;
  public event: { handler: Function};
  public eventType: string;  
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
      this.unSubs.push(this.store.subscribe(this.eventType || 'state:changed', this.eventHandler ));
    }
  }
  private detached(){
    this.unSubs.forEach(unSub => unSub());
    this.unSubs.length = 0;
    this.unSubs = [];
    delete this.unSubs;
    
    this.store = null;
    delete this.store;

    this.eventHandler = null;
    delete this.eventHandler;

    this.event = null;
    delete this.event;

  }
}
