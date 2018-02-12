import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {VxMenuComponent} from './menu.component';

@Directive({
  selector: '[vxMenuTrigger]',
  host: {
    '(click)': 'onClick()'
  }
})
export class VxMenuTriggerDirective implements OnInit {
  @Input() vxMenuTrigger: VxMenuComponent;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.vxMenuTrigger) {
      throw new Error('vxMenuTrigger without a dropdown');
    }
  }

  onClick(): void {
    this.vxMenuTrigger.element = this.el.nativeElement;
    this.vxMenuTrigger.toggle();
  }
}

/**
 * @deprecated use VxMenuTriggerDirective instead
 */
@Directive({
  selector: '[vxDropdownTrigger]',
  host: {
    '(click)': 'onClick()'
  }
})
export class VxDropdownTriggerDirective implements OnInit {
  @Input() vxDropdownTrigger: VxMenuComponent;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    console.warn('You are using the vxDropdownTrigger directive which is deprecated in favor of vxMenuTrigger.' +
      ' vxDropdownTrigger will be removed in future versions of vx-components.');

    if (!this.vxDropdownTrigger) {
      throw new Error('vxDropdownTrigger without a dropdown');
    }
  }

  onClick(): void {
    this.vxDropdownTrigger.element = this.el.nativeElement;
    this.vxDropdownTrigger.toggle();
  }
}

