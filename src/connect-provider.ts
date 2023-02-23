import { IStore } from './i-store';

export class ConnectProvider {
  public stores: IStore<any>[];
  private unSubs: Function[] = [];
  constructor({ stores, "event.handler": eventHandler }: { stores: IStore<any>[], "event.handler": Function }) {
    this.stores = stores;
    if (this.stores) {
      this.unSubs.forEach(unSub => unSub());
      this.unSubs = [];
      this.stores.forEach(store => this.unSubs.push(store.subscribe('state:changed', eventHandler)));
    }
  }
  private detached() {
    this.unSubs.forEach(unSub => unSub());
    this.unSubs.length = 0;
    this.unSubs = [];
    delete this.unSubs;
    this.stores = null;
    delete this.stores;
  }
}
