import {Component} from '@angular/core';
import {VxDialog} from '../../lib/dialog/dialog.service';
import {TitleService} from './title.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'vx-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  opened: boolean;
  constructor(public titleService: TitleService, router: Router) {
  }

}
