import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { AbstractVxPageComponent } from 'vx-components-base';

@Component({
  selector: 'vx-page',
  template: `
    <ng-content *ngIf="_visible"></ng-content>
  `,
  styleUrls: ['./vx-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'vx-page',
    '[class.vx-page-current]': '_isCurrent',
    '[class.vx-page-left]': '_left',
    '[class.vx-page-right]': '_right',
    '[class.vx-skip-transition]': '_skipTransition'
  }
})
export class VxPageComponent extends AbstractVxPageComponent<HTMLElement> {
  _isCurrent = false;
  _skipTransition =  false;
  _visible = false;

  constructor(el: ElementRef<HTMLElement>, cdr: ChangeDetectorRef) {
    super(el, cdr);
  }

  position(current: boolean, skipTransition: boolean): void {
    this._isCurrent = current;
    this._skipTransition = skipTransition;
    this._visible = true;

    // If we are animating away
    if (!current) {
      // Wait for the animation to end and hide.
      if (skipTransition) {
        this._visible = false;
      } else {
        setTimeout(() => {
          this._visible = false;
          this.cdr.markForCheck();
        }, 350)
      }
    }
  }

}
