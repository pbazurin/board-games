import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    TranslateModule,
    FlexLayoutModule
  ]
})
export class SharedUIModule {}
