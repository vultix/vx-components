import {Component} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  templateUrl: './button-group-demo.component.html',
  styleUrls: ['./button-group-demo.component.scss']
})
export class ButtonGroupDemoComponent {
  constructor(private titleService: TitleService) {
    this.titleService.title = 'Button Group';
  }

  say(what: string): void {
    alert(what);
  }
}
