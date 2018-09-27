import { Action } from '@ngrx/store';
export function reducerAgregator<T>(reducers: Array< (state: T, action: Action) => T>, state: T,  action: Action) {
  return reducers.reduce(
    (nextState, reducerFn) => {
      return reducerFn(nextState, action);
  }, state);
}
