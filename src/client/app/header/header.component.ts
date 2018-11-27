import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogAboutComponent } from './dialog-about/dialog-about.component';
import { DialogUserSettingsComponent } from './dialog-user-settings/dialog-user-settings.component';

@Component({
  selector: 'bg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  isRouterLoading = false;

  private tearDown$ = new Subject();

  constructor(router: Router, private dialog: MatDialog) {
    router.events.pipe(takeUntil(this.tearDown$)).subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isRouterLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isRouterLoading = false;
          break;
        }
      }
    });
  }

  openUserSettingsDialog() {
    this.dialog.open(DialogUserSettingsComponent, { width: '400px' });
  }

  openAboutDialog() {
    this.dialog.open(DialogAboutComponent, { width: '500px' });
  }

  ngOnDestroy() {
    this.tearDown$.next();
    this.tearDown$.complete();
  }
}
