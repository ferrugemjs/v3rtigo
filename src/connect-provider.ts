import { IStore } from './i-store';

export class ConnectProvider {
  public stores: IStore<any>[];
  private unSubs: Function[];
  private eventHandler: Function;
  private access = 0;
  constructor({ stores }: {stores: IStore<any>[]}) {
    this.stores = stores;
  }

  private attached() {
    this.eventHandler = function (){
      this.access = this.access + 1;
    }.bind(this);
    if (this.stores) {
      this.unSubs = [];
      this.stores.forEach(store => this.unSubs.push(store.subscribe('state:changed', this.eventHandler)));
    }
  }
  private detached() {
    this.unSubs.forEach(unSub => unSub());
    this.unSubs.length = 0;
    this.unSubs = [];
    delete this.unSubs;

    this.stores = null;
    delete this.stores;

    this.eventHandler = null;
    delete this.eventHandler;
  }
}
