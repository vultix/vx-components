import {
  AfterContentInit, AfterViewChecked,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import {coerceBooleanProperty} from '../Util';
import {VxItemComponent} from './item.component';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'vx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class VxDropdownComponent implements AfterContentInit, OnDestroy, AfterViewChecked {
  /** The dropdown's items */
  @ContentChildren(VxItemComponent) items: QueryList<ItemWithSubscription>;

  /** Whether the dropdown is visible */
  @Input()
  get visible(): boolean {
    return this._visible;
  };

  set visible(visible: boolean) {
    visible = coerceBooleanProperty(visible);
    if (visible !== this._visible) {
      this._visible = visible;
      this.visibleChange.emit(visible);
      // When visibility changes focus the first item;
      setTimeout(() => this.focusedIdx = 0);
      if (visible) {
        this._positioned = false;
        this.enterDown = false;
        setTimeout(() => this._onOpen());
      }
    }

  };

  /** The default text to display if there are no items */
  @Input() defaultText: string;

  /** If true the dropdown will automatically close when an item is chosen, or when clicked off of the dropdown  */
  @Input() autoClose = true;

  /** Event thrown when the dropdown's visibility changes. The value is the visibility (true or false) */
  @Output() visibleChange = new EventEmitter<boolean>();

  /** Event thrown when an item is chosen.  Will emit the selected vx-item's value */
  @Output() itemClick = new EventEmitter();

  @Input() element?: HTMLElement;

  @Input() matchWidth = false;

  @Input() offsetLeft = 0;
  @Input() offsetTop = 10;

  get focusedIdx(): number {
    return this._focusedIdx;
  }

  set focusedIdx(value: number) {
    const items = this.items.toArray();
    if (value >= items.length)
      value = items.length - 1;
    else if (value < 0)
      value = 0;

    let idx = -1;
    let found = false;
    for (const item of items) {
      if (item.focused)
        item.focused = false;
      if (item.visible && !item.disabled)
        idx++;

      if (idx === value && !found) {
        this.focusItem(item);
        found = true;
      }
    }
    this._focusedIdx = value;
    if (!found && idx > -1) {
      this.focusedIdx = idx;
    }
  }

  _positioned = false;

  @ViewChild('dropdown') _dropdown: ElementRef;

  private _focusedIdx = 0;
  private _visible = false;
  private _container = createContainer();
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private enterDown: boolean;
  private focusedItem?: VxItemComponent;

  constructor(private _el: ElementRef) {
    this._container.appendChild(_el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.items.changes.subscribe(() => {
        this.updateItemSubscriptions();
        this.focusedIdx = 0;
      });
      this.updateItemSubscriptions();
    });
  }

  ngAfterViewChecked(): void {
    this.repositionDropdown();
  }

  toggle(): void {
    this.visible = !this.visible;
  }

  updateItemSubscriptions(): void {
    this.items.forEach(item => {
      if (!item.subscription) {
        item.subscription = item.onSelect.takeUntil(this.ngUnsubscribe).subscribe(() => {
          this.itemClick.emit(item.value);
        });
      }
    })
  }

  @HostListener('window:keydown.ArrowDown', ['focusedIdx + 1', '$event'])
  @HostListener('window:keydown.ArrowUp', ['focusedIdx - 1', '$event'])
  _onArrowDown(newIdx: number, event: Event): void {
    if (this.visible) {
      this.focusedIdx = newIdx;
      event.preventDefault();
    }
  }

  @HostListener('window:keydown.escape')
  @HostListener('window:keydown.tab')
  _close(): void {
    if (this.autoClose) {
      this.visible = false;
    }
  }
  @HostListener('window:keydown.enter', ['$event'])
  _onEnterDown(event: Event): void {
    if (this.visible && this.focusedItem) {
      this.focusedItem.active = true;
      this.itemClick.emit(this.focusedItem.value);
      event.preventDefault();
    }
    this.enterDown = true;
  }

  @HostListener('window:keyup.enter', ['$event'])
  _onEnterUp(event: Event): void {
    if (this.visible && this.focusedItem) {
      this.focusedItem.active = false;
      event.preventDefault();
    }
    if (this.enterDown)
      this._close();
  }

  hasFocus(): boolean {
    return document.activeElement === this._dropdown.nativeElement;
  }
  private _onOpen(): void {
    if (this.items) {
      this.items.forEach(item => {
        item.active = false;
      });
    }

    if (!this.element) {
      throw new Error('Dropdown opened without attached element');
    }
    this.repositionDropdown();
    this._positioned = true;
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  repositionDropdown(): void {
    if (this.element && this.visible) {
      const elementPosition = this.element.getBoundingClientRect();
      const dropdown: HTMLDivElement = this._dropdown.nativeElement;

      let top = elementPosition.bottom + this.offsetTop;
      const left = elementPosition.left + this.offsetLeft;
      if (this.matchWidth)
        dropdown.style.width = `${elementPosition.width}px`;

      if ((top + dropdown.offsetHeight) > window.innerHeight) {
        top = window.innerHeight - dropdown.offsetHeight;
      }
      dropdown.style.top = `${top}px`;
      dropdown.style.left = `${left}px`;
    }
  }

  private focusItem(item: VxItemComponent): void {
    const dropdown = this._dropdown.nativeElement;

    const top = item._elementRef.nativeElement.offsetTop;
    dropdown.scrollTop = top - dropdown.offsetHeight / 4;

    item.focused = true;
    this.focusedItem = item;
  }
}

function createContainer(): HTMLDivElement {
  const container = document.createElement('div');

  document.body.appendChild(container);
  return container;
}

interface ItemWithSubscription extends VxItemComponent {
  subscription?: Subscription;
}
