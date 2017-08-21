import {Component} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  templateUrl: './input-demo.component.html',
  styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent {
  example1 = `
<vx-input-wrapper>
  <input vxInput placeholder="Username">
</vx-input-wrapper>
<vx-input-wrapper>
  <input vxInput type="password" placeholder="Password">
</vx-input-wrapper>
  `.trim();

  example1Css = `
vx-input-wrapper {
  display: block;
  max-width: 300px;
  margin-top: 10px;
}
  `.trim();

  example2 = `
<vx-input-wrapper>
  <input vxInput placeholder="Username" ngModel required>
</vx-input-wrapper>
<vx-input-wrapper>
  <input vxInput type="password" placeholder="Password" ngModel required>
</vx-input-wrapper>
  `.trim();

  constructor(titleService: TitleService) {
    titleService.title = 'Vx Input'
  }
}
