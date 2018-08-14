import {Component} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  templateUrl: './input-demo.component.html',
  styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent {
  disabled = false;
  importLbl = `import {VxInputModule} from 'vx-components';`;

  basicExample = `
<vx-input-wrapper>
  <input vxInput placeholder="Input">
</vx-input-wrapper>
  `.trim();

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
  <input #input vxInput placeholder="Placeholder" [required]="isRequired" [disabled]="inputDisabled" ngModel>
</vx-input-wrapper>

<div>Value: {{input.value}}</div>

<vx-checkbox [(checked)]="inputDisabled">Disabled</vx-checkbox>
<vx-checkbox [(checked)]="isRequired">Required</vx-checkbox>
  `.trim();

  inputDisabled: boolean;
  isRequired: boolean;
  constructor(titleService: TitleService) {
    titleService.title = 'Input'
  }
}
