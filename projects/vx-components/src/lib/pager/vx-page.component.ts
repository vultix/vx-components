import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef, Renderer2,
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
    'class': 'vx-page'
  }
})
export class VxPageComponent extends AbstractVxPageComponent<HTMLElement> {
  _visible = false;

  constructor(el: ElementRef<HTMLElement>, cdr: ChangeDetectorRef, private renderer: Renderer2) {
    super(el, cdr);
  }

  position(current: boolean, skipTransition: boolean): void {
    const el = this.el.nativeElement;
    if (!el) {
      return;
    }

    // This is a kludgy way to set these classes because hostBinding doesn't work.
    // see https://github.com/angular/angular/issues/22560 for why
    // TODO: needs a better work-around.
    this.setClass(el, 'vx-skip-transition', skipTransition);
    this.setClass(el, 'vx-page-current', current);
    this.setClass(el, 'vx-page-left', this._left);
    this.setClass(el, 'vx-page-right', this._right);

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

  private setClass(el: HTMLElement, className: string, shouldHaveClass: boolean): void {
    if (shouldHaveClass) {
      this.renderer.addClass(el, className);
    } else {
      this.renderer.removeClass(el, className)
    }
  }
}
