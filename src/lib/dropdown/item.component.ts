import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {coerceBooleanProperty} from '../Util';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'vx-item',
  template: '<ng-content></ng-content>',
  styleUrls: ['./item.component.scss'],
  host: {
    '[class.focused]': 'focused',
    '[class.active]': 'active',
    '[class.visible]': '!(filtered | async)',
    '[class.disabled]': 'disabled',
    '(click)': 'handleClick()'
  }
})
export class VxItemComponent<T = string> {
  focused: boolean;
  active: boolean;

  @Output() onSelect = new EventEmitter();
  @Input() get value(): T {
    const value = this._value;
    if (value !== null && value !== undefined)
      return value;
    else return this.searchTxt as any;
  }

  set value(value: T) {
    this._value = value;
  }

  get searchTxt(): string {
    return this._searchTxt ? this._searchTxt : this.getSearchText();
  }

  @Input()
  set searchTxt(value: string) {
    this._searchTxt = value;
  }


  @Input() set disabled(val: boolean) {
    this._disabled = coerceBooleanProperty(val);
  }
  get disabled(): boolean {
    return this._disabled;
  }

  /** @internal */
  filtered = new BehaviorSubject(false);

  private _searchTxt: string;
  private _disabled: boolean;
  private _value: T;
  constructor(public _elementRef: ElementRef) {}

  handleClick(): void {
    if (!this.disabled)
      this.onSelect.emit();
  }


  getSearchText(): string {
    if (this._elementRef.nativeElement && this._elementRef.nativeElement.innerText)
      return this._elementRef.nativeElement.innerText;
    return '';
  }
}
