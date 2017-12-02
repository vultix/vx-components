import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'vx-step',
  template: '<ng-content></ng-content>',
  styleUrls: ['../shared/tabbable.component.scss'],
  host: {
    '[style.paddingTop]': '0'
  }
})
export class VxStepComponent {
  @Input() label?: string;

  /** Whether this tab is the active tab */
  @HostBinding('class.active') active = false;

  @HostBinding('class.left') left = false;
  @HostBinding('class.right') right = false;
  @HostBinding('class.visible') visible: boolean;
}
