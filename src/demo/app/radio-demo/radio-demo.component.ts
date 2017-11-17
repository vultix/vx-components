import { Component, OnInit } from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  selector: 'vx-radio-demo',
  templateUrl: './radio-demo.component.html',
  styleUrls: ['./radio-demo.component.scss']
})
export class RadioDemoComponent implements OnInit {
  importLbl = `import {VxRadioModule} from 'vx-components';`;
  example1 = `<vx-radio-group [(ngModel)]="value">
  <vx-radio-button [value]="1">One</vx-radio-button>
  <vx-radio-button [value]="2">Two</vx-radio-button>
  <vx-radio-button [value]="3">Three</vx-radio-button>
</vx-radio-group>
<div>You Selected: {{value}}</div>`;

  example2 = `<vx-radio-group #test [attr.vx-accent]="accent || undefined" [disabled]="disabled">
  <vx-radio-button value="Top">Top</vx-radio-button>
  <vx-radio-button value="Middle">Middle</vx-radio-button>
  <vx-radio-button value="Bottom">Bottom</vx-radio-button>
</vx-radio-group>

<vx-checkbox [(ngModel)]="accent">Toggle accent colors</vx-checkbox>
<vx-checkbox [(ngModel)]="disabled">Toggle disabled</vx-checkbox>`;

  example2CSS = `vx-radio-button {
  display: block;
}
vx-radio-group {
  margin-bottom: 10px;
}`;
  value: string;
  accent = false;
  disabled = false;

  constructor(private titleService: TitleService) {
  }

  ngOnInit(): void {
    this.titleService.title = 'Radio';
  }

}
