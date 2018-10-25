import { Action } from '@ngrx/store';

export const toResponse = (action: Action) => {
  return { event: action.type, data: action };
};
