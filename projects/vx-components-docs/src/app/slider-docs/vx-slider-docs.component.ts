import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'vx-button-docs',
  templateUrl: 'vx-slider-docs.component.html',
  styleUrls: ['vx-slider-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxSliderDocsComponent implements OnInit {
  max = 100;
  min = 0;
  step = 1;
  constructor() {
  }

  ngOnInit() {
  }
}
