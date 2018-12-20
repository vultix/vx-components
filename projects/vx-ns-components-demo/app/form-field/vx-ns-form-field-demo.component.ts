import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './vx-ns-form-field-demo.component.html',
  styleUrls: ['./vx-ns-form-field-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxNsFormFieldDemoComponent {
  disabled = false;
}

