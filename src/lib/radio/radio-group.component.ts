import {
  AfterContentInit, Component, ContentChildren, forwardRef, OnDestroy, QueryList, Input, HostBinding,
  HostListener
} from '@angular/core';
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

  /** @internal */
  @HostListener('keyup.ArrowRight')
  @HostListener('keyup.ArrowDown')
  _next(): void {
    const buttons = this.buttons.toArray();
    let selectedIndex = this.getSelectedIndex();
    if (selectedIndex === buttons.length - 1) {
      selectedIndex = 0;
    } else {
      selectedIndex++;
    }
    this.handleButtonClick(buttons[selectedIndex]);
  }

  /** @internal */
  @HostListener('keyup.ArrowLeft')
  @HostListener('keyup.ArrowUp')
  _previous(): void {
    const buttons = this.buttons.toArray();
    let selectedIndex = this.getSelectedIndex();
    if (selectedIndex === 0) {
      selectedIndex = buttons.length - 1;
    } else {
      selectedIndex--;
    }
    this.handleButtonClick(buttons[selectedIndex]);
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

  private getSelectedIndex(): number {
    const buttons = this.buttons.toArray();
    let selectedIndex = 0;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].selected) {
        selectedIndex = i;
      }
    }
    return selectedIndex;
  }
}

export interface ButtonWithSubscription extends VxRadioButtonComponent {
  subscription?: Subscription;
}
