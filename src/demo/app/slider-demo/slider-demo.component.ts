import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider-demo',
  templateUrl: './slider-demo.component.html',
  styleUrls: ['./slider-demo.component.css']
})
export class SliderDemoComponent {
  min = 0;
  max = 10;
  constructor() {
    setTimeout(() => {
      this.min = 10000;
      this.max = 1000;
    })
  }

}
