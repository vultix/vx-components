import { AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

// VX_VERTICAL_EXPANDER_INPUTS: 'expanded'
export abstract class AbstractVxVerticalExpanderComponent implements AfterViewInit {

  private _expanded = false;
  constructor(protected cdr: ChangeDetectorRef) {

  }

  // @Input()
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

  ngAfterViewInit(): void {
    this.initialize();
  }

  protected abstract animateExpansion(): void;
  protected abstract initialize(): void;
}
