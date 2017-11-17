import { Component, OnInit } from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  selector: 'vx-checkbox-demo',
  templateUrl: './checkbox-demo.component.html',
  styleUrls: ['./checkbox-demo.component.css']
})
export class CheckboxDemoComponent {
  importLbl = `import {VxCheckboxModule} from 'vx-components';`;

  example1 = `<vx-checkbox>Check Me!</vx-checkbox>`;

  example2 = `<vx-checkbox  [disabled]="checkboxDisabled" #checkbox>Check me!</vx-checkbox>
<p>
  Checked: <b>{{checkbox.checked}}</b>
</p>
<vx-checkbox [(checked)]="checkboxDisabled">Disable Checkbox</vx-checkbox>
<br/>
<vx-checkbox vx-accent checked="true">Add the vx-accent attribute to change the styling to the accent color.</vx-checkbox>`;

  checkboxDisabled: boolean;

  constructor(titleService: TitleService) {
    titleService.title = 'Checkbox';
  }
}
