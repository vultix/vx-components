import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  selector: 'vx-stepper-demo',
  templateUrl: './pager-demo.component.html',
  styleUrls: ['./pager-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerDemoComponent implements OnInit {

  constructor(titleService: TitleService) {
    titleService.title = 'Stepper';
  }

  ngOnInit(): void {
  }

}
