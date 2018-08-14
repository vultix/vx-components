import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {coerceBooleanProperty} from '../shared/util';
import {BehaviorSubject} from 'rxjs';
import {VX_MENU_TOKEN} from './menu.token';
import {VxMenuComponent} from './menu.component';
import {NgTemplateOutlet} from '@angular/common';

export interface IVxMenuComponent<T> extends VxMenuComponent<T> {

}

@Component({
  selector: 'vx-item',
  template: '<ng-template><ng-content></ng-content></ng-template> <ng-container *ngTemplateOutlet="_template"></ng-container>',
  styleUrls: ['./item.component.scss'],
  host: {
    '[class.focused]': '_focused',
    '[class.active]': '_active',
    '[class.visible]': '!(filtered | async)',
    '[class.disabled]': 'disabled',
    '(click)': 'handleClick()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxItemComponent<T = string> {
  _focused: boolean;
  _active: boolean;
  test = false;

  @Output() select = new EventEmitter();

  /**
   * @deprectated use (select) instead
   */
  @Output() get onSelect(): EventEmitter<any> {
    console.warn('VxItemComponent (onSelect) output has been deprecated and ' +
      'renamed to (select).  Support will be dropped in future versions.');

    return this.select;
  };

  @Input() get value(): T {
    const value = this._value;
    if (value !== null && value !== undefined)
      return value;
    else return this.searchTxt as any;
  }

  set value(value: T) {
    this._value = value;
  }


  @Input()
  set searchTxt(value: string) {
    this._searchTxt = value;
  }

  get searchTxt(): string {
    if (!this._searchTxt) {
      throw new Error('Trying to search through vx-autocomplete without a set [searchTxt].');
    }
    return this._searchTxt;
  }


  @Input() set disabled(val: boolean) {
    this._disabled = coerceBooleanProperty(val);
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @ViewChild(TemplateRef)
  @Input()
  _template: TemplateRef<any>;

  private _searchTxt: string;
  private _disabled: boolean;
  private _value: T;

  constructor(public _elementRef: ElementRef, @Inject(VX_MENU_TOKEN) @Optional() private menu?: IVxMenuComponent<T>) {
  }

  handleClick(): void {
    if (!this.disabled) {
      if (this.menu) {
        this.menu._selectItem(this);
      } else {
        this.select.emit();
      }
    }
  }

}
