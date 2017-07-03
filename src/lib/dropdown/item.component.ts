import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'vx-item',
  template: '<ng-content></ng-content>',
  styleUrls: ['./item.component.scss'],
  host: {
    '[class.focused]': 'focused',
    '[class.active]': 'active',
    '(click)': 'handleClick()'
  }
})
export class VxItemComponent {
  @Input() focused: boolean;
  @Input() active: boolean;

  @Output() onSelect = new EventEmitter();
  @Input() value: any;

  handleClick(): void {
    this.onSelect.emit();
  }

  constructor(public _elementRef: ElementRef) {}
}
