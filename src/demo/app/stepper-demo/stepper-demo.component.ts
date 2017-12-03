import {Component, OnInit} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  selector: 'vx-stepper-demo',
  templateUrl: './stepper-demo.component.html',
  styleUrls: ['./stepper-demo.component.scss']
})
export class StepperDemoComponent implements OnInit {
  importLbl = `import {VxStepperModule} from 'vx-components';`;

  example1Html = `<vx-checkbox #linear>Enable Linear Mode</vx-checkbox>
<vx-stepper [linear]="linear.checked">
  <vx-step label="Fill out your name" [stepControl]="nameInput">
    <vx-input-wrapper>
      <input vxInput placeholder="Enter Name" name="name" ngModel #nameInput="ngModel" required>
    </vx-input-wrapper>
    <div>
      <button vx-button vxStepperNext>Next</button>
    </div>
  </vx-step>
  <vx-step label="Fill out your address" [stepControl]="addressInput">
    <vx-input-wrapper>
      <input vxInput placeholder="Enter Your Address" name="address" ngModel #addressInput="ngModel" required>
    </vx-input-wrapper>
    <div>
      <button vx-button vxStepperBack>Back</button>
      <button vx-button vxStepperNext>Next</button>
    </div>
  </vx-step>
  <vx-step label="Done">
    You are finished!
    <div>
      <button vx-button vxStepperBack>Back</button>
    </div>
  </vx-step>
</vx-stepper>`;

  example1CSS = `button {
  margin-top: 10px;
}
vx-input-wrapper {
  width: 250px;
}
vx-stepper {
  background: white;
}`;
  constructor(titleService: TitleService) {
    titleService.title = 'Stepper';
  }

  ngOnInit(): void {
  }

}
