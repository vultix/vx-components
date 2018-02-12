import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {VxMenuComponent} from './menu.component';

@Directive({
  selector: '[vxAttachMenu]'
})
export class VxAttachMenuDirective implements OnInit {
  @Input() vxAttachMenu: VxMenuComponent;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.vxAttachMenu) {
      throw new Error('vxAttachMenu without a dropdown');
    }
    this.vxAttachMenu.element = this.el.nativeElement;
  }
}


/*
  @deprecated, change to VxAttachMenuDirective instead
 */
@Directive({
  selector: '[vxAttachDropdown]'
})
export class VxAttachDropdownDirective implements OnInit {
  @Input() vxAttachDropdown: VxMenuComponent;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    console.warn('Use of vxAttachDropdown directive is deprecated, please change to vxAttachMenu.' +
      ' VxAttachDropdown will be removed from future versions of vx-components.');
    if (!this.vxAttachDropdown) {
      throw new Error('vxAttachDropdown without a dropdown');
    }
    this.vxAttachDropdown.element = this.el.nativeElement;
  }
}
