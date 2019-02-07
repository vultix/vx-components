import { ChangeDetectorRef, Input } from '@angular/core';
import { coerceBooleanProperty } from '../shared';

export abstract class AbstractVxVerticalExpanderComponent {

  private _expanded = false;
  constructor(protected cdr: ChangeDetectorRef) {

  }

  @Input()
  set expanded(val: boolean) {
    val = coerceBooleanProperty(val);
    if (val !== this._expanded) {
      this._expanded = val;
      this.animateExpansion();
      this.cdr.markForCheck();
    }
  }
  get expanded(): boolean {
    return this._expanded;
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }

  protected abstract animateExpansion(): void;
}
