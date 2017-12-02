import {Component, OnInit} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  selector: 'vx-stepper-demo',
  templateUrl: './stepper-demo.component.html',
  styleUrls: ['./stepper-demo.component.css']
})
export class StepperDemoComponent implements OnInit {

  constructor(titleService: TitleService) {
    titleService.title = 'Stepper';
  }

  ngOnInit(): void {
  }

}
