import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: 'vx-stepper-docs.component.html',
  styleUrls: ['vx-stepper-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxStepperDocsComponent implements OnInit {

  constructor(private title: Title) {
    title.setTitle('Stepper Group');
  }

  ngOnInit() {
  }
}
