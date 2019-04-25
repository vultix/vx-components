import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { VxMenuComponent } from './vx-menu.component';

@Directive({
  selector: '[vxMenuTrigger]',
  host: {
    '(click)': '_handleClick()'
  }
})
export class VxMenuTriggerDirective implements OnInit {
  protected menu!: VxMenuComponent<any>;

  constructor(private el: ElementRef<HTMLElement>) {
  }

  @Input() set vxMenuTrigger(menu: VxMenuComponent<any>) {
    this.menu = menu;
  }

  ngOnInit(): void {
    if (!this.menu) {
      throw new Error('Tried using a [vxMenuTrigger] directive without passing a menu.');
    }
    if (!(this.menu instanceof VxMenuComponent)) {
      throw new Error('Tried using a [vxMenuTrigger] directive with an invalid menu.');
    }
  }

  _handleClick(): void {
    if (this.menu) {
      this.menu.attachedTo = this.el.nativeElement;
      this.menu.toggle();
    }
  }

}
