import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'vx-tabs-demo.component.html',
  // styleUrls: ['vx-tabs-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxTabsDemoComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
