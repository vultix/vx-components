import { ChangeDetectorRef, ElementRef } from '@angular/core';

export abstract class AbstractVxPageComponent<E> {
  _left = false;
  _right = false;


  set _current(current: boolean) {
    let skipTransition = this.__current === undefined;

    if (current !== this.__current) {
      this.__current = current;
    } else {
      skipTransition = true
    }

    this.position(current, skipTransition);
    this.cdr.detectChanges();
  };

  private __current?: boolean;
  constructor(protected el: ElementRef<E>, protected cdr: ChangeDetectorRef) {

  }

  /**
   * Called to position pages to prepare for animation
   * @param current whether or not the page is current
   * @param skipTransition will be true on the first call.  Should be no transition when initializing.
   * Also true when not changing from visible to not visible and vice-versa
   */
  abstract position(current: boolean, skipTransition: boolean): void;
}
