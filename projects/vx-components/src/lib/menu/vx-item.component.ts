import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {AbstractVxItemComponent, VX_MENU_TOKEN, AbstractVxMenuComponent} from 'vx-components-base';
import {VxMenuComponent} from './vx-menu.component';

@Component({
  selector: 'vx-item',
  templateUrl: 'vx-item.component.html',
  styleUrls: ['vx-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vx-item]': 'true',
    '[class.vx-disabled]': 'disabled',
    '[class.vx-focused]': 'focused',
    '[class.vx-active]': '_active',
    '(click)': '_handleSelect()'
  }
})
export class VxItemComponent<T> extends AbstractVxItemComponent<T> {
  _active = false;

  get focused(): boolean {
    return !!this._menu && (this._menu as VxMenuComponent<T>).focusedItem === this;
  }

  constructor(cdr: ChangeDetectorRef, @Inject(VX_MENU_TOKEN) @Optional() menu: AbstractVxMenuComponent<T, any>,
              public _el: ElementRef<HTMLElement>) {
    super(cdr, menu);
  }

  getTextContent(): string {
    if (this._child) {
      return this._child.getTextContent();
    }
    return this._el.nativeElement.textContent || '';
  }

  _markForCheck(): void {
    this.cdr.markForCheck();
  }
}
