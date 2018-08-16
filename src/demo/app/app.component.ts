import {Component} from '@angular/core';
import {TitleService} from './title.service';
import {ThemingService} from './theming/theming.service';

@Component({
  selector: 'vx-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  opened: boolean;

  constructor(public titleService: TitleService, private themingService: ThemingService) {
    themingService.loadBundle().subscribe(() => {

    });
  }

}
