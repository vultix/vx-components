import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { View } from 'tns-core-modules/ui/core/view';
import {screen} from 'tns-core-modules/platform';
import { AbstractVxPageComponent } from 'vx-components-base';

@Component({
  selector: '[vx-ns-page]',
  template: `
    <ng-content *ngIf="_visible"></ng-content>
  `,
  styleUrls: ['./vx-ns-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'vx-ns-page'
  }
})
export class VxNsPageComponent extends AbstractVxPageComponent<View> {
  _visible = false;

  private timeout?: any;
  constructor(el: ElementRef<View>, cdr: ChangeDetectorRef) {
    super(el, cdr);
  }

  position(current: boolean, skipTransition: boolean): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    this._visible = true;

    const el = this.el.nativeElement;
    let width = el.getActualSize().width;
    let retry = false;

    if (!width) {
      width = screen.mainScreen.widthDIPs; // Default to offscreen
      retry = true;
    }

    const newX = current ? 0 : (this._left ? -width : width);
    if (retry) {
      el.style.translateX = newX;
      this._visible = current;
      this.timeout = setTimeout(() => this.position(current, skipTransition), 30);
      return;
    }

    if (skipTransition) {
      el.style.translateX = newX;
      this._visible = current;
      return;
    }

    el.animate({
      translate: {
        x: newX,
        y: 0
      },
      duration: 300
    }).then(() => {
      // When finished animating hide the no longer needed pages
      if (!current) {
        this._visible = false;
        this.cdr.markForCheck();
      }
    })
  }
}
