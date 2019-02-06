import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VxPagerComponent } from 'vx-components';

@Component({
  selector: 'vx-checbox-docs',
  templateUrl: 'vx-checkbox-docs.component.html',
  styleUrls: ['vx-checkbox-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxCheckboxDocsComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('vx-checkbox');
  }

  ngOnInit() {
  }

}
