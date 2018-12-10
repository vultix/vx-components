import {AbstractVxAttachMenuDirective} from 'vx-components-base';
import {Directive, ElementRef, Input} from '@angular/core';
import {VxMenuComponent} from './vx-menu.component';

@Directive({
  selector: '[vxAttachMenu]'
})
export class VxAttachMenuDirective extends AbstractVxAttachMenuDirective<HTMLElement> {
  protected menu!: VxMenuComponent<any>;
  protected directiveName = 'vxAttachMenu';

  constructor(el: ElementRef<HTMLElement>) {
    super(el);
  }

  @Input() set vxAttachMenu(menu: VxMenuComponent<any>) {
    this.menu = menu;
  }

}
