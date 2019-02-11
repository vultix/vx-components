import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: 'vx-spinner-docs.component.html',
  styleUrls: ['vx-spinner-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxSpinnerDocsComponent implements OnInit {
  value = '1';

  constructor(private title: Title) {
    title.setTitle('Spinner');
  }

  ngOnInit() {
  }
}
