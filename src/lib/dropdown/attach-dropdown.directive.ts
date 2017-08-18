import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {VxDropdownComponent} from './dropdown.component';

@Directive({
  selector: '[vxAttachDropdown]'
})
export class VxAttachDropdownDirective implements OnInit {
  @Input() vxAttachDropdown: VxDropdownComponent;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (!this.vxAttachDropdown) {
      throw new Error('vxAttachDropdown without a dropdown');
    }
    this.vxAttachDropdown.element = this.el.nativeElement;
  }
}
