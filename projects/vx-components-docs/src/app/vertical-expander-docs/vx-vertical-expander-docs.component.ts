import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: 'vx-vertical-expander-docs.component.html',
  styleUrls: ['vx-vertical-expander-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxVerticalExpanderDocsComponent implements OnInit {

  constructor(private title: Title) {
    title.setTitle('Vertical Expander');
  }

  ngOnInit() {
  }
}
