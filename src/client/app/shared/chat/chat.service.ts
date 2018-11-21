import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

import { ChatMessage } from './chat.message';

@Injectable()
export class ChatService {
  get messages$() {
    return this.messagesSubject.asObservable();
  }

  get myMessages$() {
    return this.myMessagesSubject.asObservable();
  }

  myName = 'Me';

  private messages: ChatMessage[] = [];
  private messagesSubject = new BehaviorSubject(this.messages);
  private myMessagesSubject = new Subject<string>();

  constructor() {}

  sendMessageFromMe(text: string) {
    this.sendMessage(this.myName, text);
    this.myMessagesSubject.next(text);
  }

  sendMessage(from: string, text: string) {
    this.messages.push(<ChatMessage>{
      from: from,
      text: text,
      timestamp: new Date().toISOString()
    });
    this.messagesSubject.next(this.messages);
  }

  sendSystemMessage(text: string) {
    this.messages.push(<ChatMessage>{
      text: text,
      isSystem: true,
      timestamp: new Date().toISOString()
    });
    this.messagesSubject.next(this.messages);
  }
}
