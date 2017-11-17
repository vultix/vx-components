import {AfterContentInit, Component, ContentChildren, forwardRef, OnDestroy, QueryList, Input, HostBinding} from '@angular/core';
import {VxRadioButtonComponent} from './radio-button.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';
import {Subject} from 'rxjs/Subject';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'vx-radio-group',
  template: '<ng-content></ng-content>',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxRadioGroupComponent),
      multi: true
    }
  ]
})
export class VxRadioGroupComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {
  @ContentChildren(VxRadioButtonComponent) buttons: QueryList<ButtonWithSubscription>;

  /** Whether the radio group is disabled. */
  @HostBinding('class.disabled')
  @Input() disabled = false;

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this.writeValue(value);
    this.onChangeFn(value);
  }


  private _value: any;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private onChangeFn = (v: boolean) => {};
  private onTouchedFn = () => {};

  /** @internal */
  ngAfterContentInit(): void {
    this.buttons.changes.startWith(null).subscribe(() => {
      this.updateButtonSubscriptions();
      this.updateButtonSelections();
    })
  }

  /** @internal */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /** @internal */
  writeValue(obj: any): void {
    this._value = obj;
    if (this.buttons) {
      this.updateButtonSelections();
    }
  }

  /** @internal */
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  /** @internal */
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  private updateButtonSubscriptions(): void {
    this.buttons.forEach(button => {
      if (!button.subscription) {
        button.subscription = button.onClick.subscribe(() => {
          this.handleButtonClick(button);
        });
      }
    })
  }

  private updateButtonSelections(): void {
    this.buttons.forEach(button => {
      button.selected = this._value === button.value;
    })
  }

  private handleButtonClick(clicked: VxRadioButtonComponent): void {
    this._value = clicked.value;
    this.onChangeFn(clicked.value);
    this.onTouchedFn();
    this.updateButtonSelections();
  }
}

interface ButtonWithSubscription extends VxRadioButtonComponent {
  subscription?: Subscription;
}
