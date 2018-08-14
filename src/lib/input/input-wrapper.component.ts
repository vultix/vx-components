import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {VxInputDirective} from './vx-input.directive';
import {Subscription} from 'rxjs';

@Component({
  selector: 'vx-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss'],
  host: {
    '[class.focused]': '_input?.focused',
    '[class.invalid]': '_input?.invalid || _invalid',
    '[class.disabled]': '_input?.disabled'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxInputWrapperComponent implements AfterContentInit, OnDestroy {
  @ContentChild(VxInputDirective) _input: VxInputDirective;


  @Input() _invalid = false;

  @Output() _click = new EventEmitter();

  private subscription?: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    if (!this._input) {
      throw new Error('<vx-input-wrapper> requires a vxInput directive!');
    }
    this.subscription = this._input.stateChanges.subscribe(() => {
      this.cdr.markForCheck();
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('click')
  _handleClick(): void {
    this._input.focus();
    this._click.next();
  }

}
