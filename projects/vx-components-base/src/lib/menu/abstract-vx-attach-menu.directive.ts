import { ElementRef, OnInit } from '@angular/core';
import { AbstractVxMenuComponent } from './abstract-vx-menu.component';

export abstract class AbstractVxAttachMenuDirective<E> implements OnInit {
  protected abstract menu: AbstractVxMenuComponent<any, E>;
  protected abstract directiveName: string;

  protected constructor(protected el: ElementRef<E>) {
  }

  ngOnInit(): void {
    if (!this.menu) {
      throw new Error(`${this.directiveName} without a menu`);
    }
    this.menu.attachedTo = this.el.nativeElement;
  }
}
