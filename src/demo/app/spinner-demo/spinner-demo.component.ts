import {Component} from '@angular/core';

@Component({
  templateUrl: './spinner-demo.component.html'
})
export class SpinnerDemoComponent {
  demo1HTML = `<vx-spinner></vx-spinner>
<vx-spinner vx-accent></vx-spinner>
<vx-spinner vx-dark></vx-spinner>
<vx-spinner vx-light style="background-color: black"></vx-spinner>`;
}
