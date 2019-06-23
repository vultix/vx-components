import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VxPagerComponent } from 'vx-components';

@Component({
  selector: 'vx-checbox-docs',
  templateUrl: 'vx-slide-toggle-docs.component.html',
  styleUrls: ['vx-slide-toggle-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxSlideToggleDocsComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('vx-checkbox');
  }

  ngOnInit() {
  }

}
