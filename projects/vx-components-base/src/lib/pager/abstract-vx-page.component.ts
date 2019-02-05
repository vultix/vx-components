import { ChangeDetectorRef, ElementRef } from '@angular/core';

export abstract class AbstractVxPageComponent<E> {
  _left = false;
  _right = false;


  set _current(current: boolean) {
    if (current !== this.__current) {
      this.position(current, this.__current === undefined);
      this.__current = current;
    }
    this.cdr.markForCheck();
  };

  private __current?: boolean;
  constructor(protected el: ElementRef<E>, protected cdr: ChangeDetectorRef) {

  }

  /**
   * Only called when the page changes from current to no longer current or from hidden to current.
   * @param current whether or not the page is current
   * @param skipTransition will be true on the first call.  Should be no transition when initializing.
   */
  abstract position(current: boolean, skipTransition: boolean): void;
}
