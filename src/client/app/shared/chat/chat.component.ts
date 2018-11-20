import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ChatMessage } from './chat.message';

@Component({
  selector: 'bg-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  // players: Array<c.Player>;

  currentMessage: string;
  messages: Array<ChatMessage> = [];

  @ViewChild('messagesList', { read: ElementRef })
  messagesList: any;

  // private messageSubscription: Subscription;
  // private gameSubscription: Subscription;

  constructor() // private chatService: ChatService,
  // private gameService: GameService
  {}

  ngOnInit() {
    // this.messageSubscription = this.chatService.message.subscribe(
    //   (m: c.Message) => this.messages.push(new ChatMessage(m, this.players))
    // );
    // this.gameSubscription = this.gameService.game.subscribe(
    //   (g: c.Game) => (this.players = g.players)
    // );
  }

  onSubmit() {
    this.messages.push(<ChatMessage>{
      from: 'Me',
      text: this.currentMessage
    });
    // this.chatService.sendMessage(this.myMessage).subscribe();
    this.currentMessage = '';
    this.scrollToBottom();
  }

  ngOnDestroy() {
    // this.messageSubscription.unsubscribe();
    // this.gameSubscription.unsubscribe();
  }

  private scrollToBottom(): void {
    const nativeEl = this.messagesList.nativeElement;

    nativeEl.scrollTop = nativeEl.scrollHeight;
  }
}
