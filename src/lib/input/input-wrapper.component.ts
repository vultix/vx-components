import {Component, ContentChild} from '@angular/core';
import {VxInputDirective} from './vx-input.directive';

@Component({
  selector: 'vx-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss'],
  host: {
    '[class.focused]': '_input.focused',
    '[class.invalid]': '_input._isInvalid()',
    '[class.disabled]': '_input.disabled'

  }
})
export class VxInputWrapperComponent {
  @ContentChild(VxInputDirective) _input: VxInputDirective;
}
