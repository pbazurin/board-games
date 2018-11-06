import { Action } from '@dto/action';

export const toResponse = (action: Action) => {
  return { event: action.type, data: action };
};
