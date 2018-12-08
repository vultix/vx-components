import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'vx-radio-docs.component.html',
  styleUrls: ['vx-radio-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxRadioDocsComponent implements OnInit {
  constructor(private title: Title) {
    title.setTitle('Radio Group');
  }

  ngOnInit() {
  }
}
