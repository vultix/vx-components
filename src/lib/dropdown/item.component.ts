import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'vx-item',
  template: '<ng-content></ng-content>',
  styleUrls: ['./item.component.scss'],
  host: {
    '[class.focused]': 'focused',
    '[class.active]': 'active',
    '[class.visible]': 'visible',
    '(click)': 'handleClick()'
  }
})
export class VxItemComponent {
  focused: boolean;
  active: boolean;
  visible = true;

  @Output() onSelect = new EventEmitter();
  @Input() value: any;
  @Input() searchTxt: string;

  handleClick(): void {
    this.onSelect.emit();
  }

  constructor(public _elementRef: ElementRef) {}
}
