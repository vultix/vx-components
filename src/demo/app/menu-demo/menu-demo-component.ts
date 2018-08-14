import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  templateUrl: './menu-demo-component.html',
  styleUrls: ['./menu-demo-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDemoComponent {
  example1 = `<button vx-button [vxMenuTrigger]="menu">Show Menu</button>
<vx-menu #menu>
  <vx-item>Item A</vx-item>
  <vx-item>Item B</vx-item>
  <vx-item>Item C</vx-item>
</vx-menu>`;

  selected?: any;
  constructor(private titleService: TitleService) {
    titleService.title = 'Menu';
  }
}
