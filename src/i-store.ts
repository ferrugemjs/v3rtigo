export interface IStore<T> {
    getState(): T;
    dispatch(type: string, payload?: any): any;
    subscribe(type: string, handler: Function): any;
}

export interface ISub {
  handler: Function;
  uid: string;
  type: string;
}

export interface ISubscriptType{
  type: string;
  [key: string]: any;
}