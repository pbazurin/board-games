import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) { }

  showMessage(error: string): void {
    this.translateService.get('Close')
      .subscribe((closeTranslated: string) => {
        let snackRef = this.snackBar.open(error, closeTranslated);
        snackRef.onAction().subscribe(() => snackRef.dismiss());
      });
  }
}
