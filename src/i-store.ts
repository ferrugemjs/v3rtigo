export interface IStore<T> {
    getState(): T;
    dispatch(type: string, payload?: any): any;
    subscribe(type: string, handler: Function): any;
}