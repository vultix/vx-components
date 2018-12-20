import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AttachedPositionStrategy } from 'vx-components';

@Component({
  selector: 'vx-menu-docs',
  templateUrl: 'vx-menu-docs.component.html',
  styleUrls: ['vx-menu-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxMenuDocsComponent implements OnInit {

  positionStrategy: AttachedPositionStrategy = [];

  constructor(private title: Title) {
    this.title.setTitle('vx-menu');
  }

  ngOnInit() {
  }
}
