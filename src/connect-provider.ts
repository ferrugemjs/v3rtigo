import { IStore } from './i-store';
import { ITarget } from './i-target';

export class ConnectProvider {
  public store: IStore<any>;
  private unSubs: Function[];
  private eventHandler: Function;
  public eventType: string;
  constructor({ eventHandler, eventType = 'state:changed', target, store}: {store: IStore<any>, eventType: string, eventHandler?: Function, target: ITarget }) {
    if (eventHandler) {
      this.eventHandler = eventHandler.bind(target);
    } else {
      const { key_id, is } = target.$props;
      this.eventHandler = target.$draw.bind(target, { key_id, is });
    }
    this.eventType = eventType;
    this.store = store;
  }
  private attached() {
    if (this.eventHandler && this.store) {
      this.unSubs = [];
      this.unSubs.push(this.store.subscribe(this.eventType, this.eventHandler));
    }
  }
  private detached() {
    this.unSubs.forEach(unSub => unSub());
    this.unSubs.length = 0;
    this.unSubs = [];
    delete this.unSubs;

    this.store = null;
    delete this.store;

    this.eventHandler = null;
    delete this.eventHandler;
  }
}
