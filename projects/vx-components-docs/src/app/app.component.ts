import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'vx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vx-components-docs';
  opened = false;

  constructor(public titleService: Title) {

  }
}

