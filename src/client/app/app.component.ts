import { Component, OnInit } from '@angular/core';

import { SharedModel } from '../../shared/shared.model';

@Component({
  selector: 'tg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  ngOnInit() {
    const sharedModel = <SharedModel>{
      test: 'ta-ta'
    };

    this.title = sharedModel.test;
  }
}
