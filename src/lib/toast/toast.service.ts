import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Type} from '@angular/core';
import {getHighestZIdx} from '../Util';
import {VxToastComponent} from './toast.component';
import {CreateToastOptions, ToastOptions, ToastPosition} from './toast.types';

@Injectable()
export class VxToast {
  private containers: {[key: string]: HTMLElement} = {};
  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) {
  }

  /**
   * Used to create a toast
   * @param {CreateToastOptions} options
   * @returns {VxToastComponent}
   */
  open(options: CreateToastOptions): VxToastComponent {
    const container = this.getContainer(options.position || 'top-right');

    const factory = this.resolver.resolveComponentFactory(VxToastComponent);
    const toast = factory.create(this.injector, undefined, container);
    this.appRef.attachView(toast.hostView);
    toast.instance.create(toast, container, null, options);

    return toast.instance;
  }

  private getContainer(position: ToastPosition): HTMLElement {
    let container = this.containers[position];

    if (!container) {
      container = document.createElement('div');
      container.style.zIndex = `${getHighestZIdx()}`;
      container.className = `vx-toast-container ${position}`;
      document.body.appendChild(container);
      this.containers[position] = container;
    }

    const innerContainer = document.createElement('div');
    container.appendChild(innerContainer);
    return innerContainer;
  }

}
