import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {VxDropdownComponent} from './dropdown.component';

@Directive({
  selector: '[vxDropdownTrigger]',
  host: {
    '(click)': 'onClick()'
  }
})
export class VxDropdownTriggerDirective implements OnInit {
  @Input() vxDropdownTrigger: VxDropdownComponent;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (!this.vxDropdownTrigger) {
      throw new Error('vxDropdownTrigger without a dropdown');
    }
  }

  onClick(): void {
    this.vxDropdownTrigger.element = this.el.nativeElement;
    this.vxDropdownTrigger.toggle();
  }
}
