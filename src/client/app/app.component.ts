import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { SocketService } from './core/services/socket.service';
import { GlobalState } from './store';
import { AppInitializeAction } from './store/app/app.actions';
import { AuthConnectionIdGeneratedAction, AuthGenerateConnectionIdAction } from '@dto/auth/auth-actions';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<GlobalState>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/sprite.svg'));

    this.socketService.connect().socket
      .on('connect', () => {
        console.log('ws connected');

        this.socketService
          .on(AuthConnectionIdGeneratedAction, action => console.log(action.connectionId))
          .emit(new AuthGenerateConnectionIdAction('name', 'password'));
      });

    this.store.dispatch(new AppInitializeAction());
  }
}
