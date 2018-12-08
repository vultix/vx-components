import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'vx-radio-demo.component.html',
  styleUrls: ['vx-radio-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxRadioDemoComponent implements OnInit {
  constructor(private title: Title) {
    title.setTitle('Radio Group');
  }


  ngOnInit() {
  }
}
