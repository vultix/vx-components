import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { VX_BUTTON_GROUP } from '../button/vx-button.tokens';

@Component({
  selector: 'vx-button-group',
  templateUrl: 'vx-button-group.component.html',
  styleUrls: ['vx-button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-button-group'
  },
  providers: [
    {
      provide: VX_BUTTON_GROUP,
      useExisting: forwardRef(() => VxButtonGroupComponent)
    }
  ]
})
export class VxButtonGroupComponent<T> implements OnInit {

  @Input()
  set value(val: T) {
    if (val !== this._value) {
      this._value = val;
      this.cdr.markForCheck();
    }
  }
  get value(): T {
    return this._value;
  }

  private _value!: T;

  @Output()
  readonly valueChange = new EventEmitter<T>();

  @Output()
  readonly buttonSelect = this.valueChange;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  _handleButtonSelect(val: T) {
    this.value = val;
    this.valueChange.emit(val);
  }
}
