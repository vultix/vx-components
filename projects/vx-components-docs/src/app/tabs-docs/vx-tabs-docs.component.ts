import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'vx-tabs-docs.component.html',
  // styleUrls: ['vx-tabs-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxTabsDocsComponent implements OnInit {
  tabs: string[] = [];
  constructor() {
  }

  ngOnInit() {
  }
}
