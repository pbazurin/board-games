import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChatMessage } from './chat.message';
import { ChatService } from './chat.service';

@Component({
  selector: 'bg-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked, OnInit, OnDestroy {
  currentMessage: string;
  messages: Array<ChatMessage>;

  @ViewChild('messagesList', { read: ElementRef })
  messagesList: any;

  private tearDown$ = new Subject();
  private isScrollToLastRequired = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.messages$
      .pipe(takeUntil(this.tearDown$))
      .subscribe(messages => {
        this.messages = messages;
        this.isScrollToLastRequired = true;
      });
  }

  ngAfterViewChecked() {
    if (this.isScrollToLastRequired) {
      this.scrollToBottom();
      this.isScrollToLastRequired = false;
    }
  }

  trackByFn(index: number, item: ChatMessage) {
    return item.timestamp;
  }

  onSubmit() {
    this.chatService.sendMessageFromMe(this.currentMessage);
    this.currentMessage = '';
  }

  ngOnDestroy() {
    this.tearDown$.next();
    this.tearDown$.complete();
  }

  private scrollToBottom(): void {
    const nativeEl = this.messagesList.nativeElement;

    nativeEl.scrollTop = nativeEl.scrollHeight;
  }
}
