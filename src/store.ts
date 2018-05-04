import { IStore } from './i-store';

interface ISub {
  handler: Function;
  uid: string;
  type: string;
}

export class Store<T> implements IStore<T>{
  private _state: T;
  private subs: ISub[] = [];

  protected set state(state: T) {
    this._state = this.cloneState(state);
  }
  public getState(): T {
    return this._state;
  }
  public dispatch(type: string, payload?: any) {
    if (this[type]) {
      this.emit(type, payload);
      return this[type](payload);
    }
    return new Error(`Method ${type} no found in store!`);
  }

  public subscribe(type: string, handler: Function) {
    let sub: ISub = {
      uid: `${new Date().getTime()}-${Math.floor(Math.random() * 10001)}`,
      handler,
      type
    };
    this.subs.push(sub);
    return this.unsubscribe.bind(this, sub);
  }

  private unsubscribe(p_sub: ISub) {
    let indx = this.subs.findIndex(sub => p_sub.uid === sub.uid);
    if (indx > -1) {
      this.subs.splice(indx, 1);
    }
  }

  protected setState(state: T) {
    this._state = this.cloneState(state);
    this.emit('state:changed');
  }
  private cloneState(state: T) {
    if (['string', 'boolean', 'number'].indexOf(typeof false)) {
      return state;
    } else if (Array.isArray(state)) {
      return (<any>state).concat();
    } else if (typeof state === 'object') {
      // return Object.assign({}, this._state);
      return JSON.parse(JSON.stringify(state));
    }
    return state;
  }
  private emit(type: string, payload?: any) {
    for (let i = 0, tm = this.subs.length; i < tm; i++) {
      let sub = this.subs[i];
      if (sub.handler) {
        if (sub.type === type) {
          sub.handler(payload);
        }
      } else {
        this.subs.splice(i, 1);
      }
    }
  }
}