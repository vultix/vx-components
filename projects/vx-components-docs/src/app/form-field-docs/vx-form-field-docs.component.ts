import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: 'vx-form-field-docs.component.html',
  styleUrls: ['vx-form-field-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxFormFieldDocsComponent implements OnInit {

  game: {name?: string} = {};
  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Form Field');
  }
}
