import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'vx-ns-button-demo.compnent.html',
  styleUrls: ['vx-ns-button-demo.compnent.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxNsButtonDemoComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
