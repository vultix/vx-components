import {Component} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  selector: 'vx-tabs-demo',
  templateUrl: './tabs-demo.component.html',
  styleUrls: ['./tabs-demo.component.scss']
})
export class TabsDemoComponent {
  importLbl = `import {VxTabsModule} from 'vx-components';`;

  example1 = `
<vx-tabs>
  <vx-tab label="Tab 1">
    Here is the first tab!
  </vx-tab>
  <vx-tab label="Tab 2">
    Here is the second tab!
  </vx-tab>
  <vx-tab label="Tab 3">
    Here is the third tab!
  </vx-tab>
</vx-tabs>
  `.trim();

  example2 = `
<vx-checkbox #overflow>Force Overflow</vx-checkbox>
<vx-tabs [class.overflow]="overflow.checked">
  <vx-tab label="Small Tab">
    A small tab with little content.
  </vx-tab>
  <vx-tab label="Large Tab">
    <h1>Big Tab</h1>
    <div class="spacer"></div>
    Some content below.
  </vx-tab>
</vx-tabs>
  `.trim();

  example2CSS = `
.spacer {
  height: 300px;
  background: red;
}
.overflow {
  max-height: 200px;
}
  `.trim();

  constructor(titleService: TitleService) {
    titleService.title = 'Vx Tabs'
  }
}
