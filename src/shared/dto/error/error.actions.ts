import { Action } from '@dto/action';

export class ErrorResponseAction implements Action {
  readonly type = '[Error] Error response';
  constructor(public payload: string) {}
}
