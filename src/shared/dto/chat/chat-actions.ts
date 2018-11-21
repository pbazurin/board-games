import { Action } from '@dto/action';

export class ChatSendMessagePayload {
  gameId: string;
  from: string;
  text: string;
}

export class ChatSendMessageAction implements Action {
  readonly type = '[Chat] Send message';
  constructor(public payload: ChatSendMessagePayload) {}
}
