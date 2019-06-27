import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { getNextHighestZIndex } from '../shared/util';
import { _VX_TOAST_CLOSE_TOKEN, _VX_TOAST_OPTIONS_TOKEN, VxToastComponent } from './vx-toast.component';
import { OpenToastOptions, ToastPosition } from './vx-toast.types';


let _toastIdCounter = 0;

@Injectable()
export class VxToast {
  private containers: { [key: string]: HTMLElement | undefined } = {};

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) {
  }

  /**
   * Used to create a toast
   */
  open(options: OpenToastOptions): VxToastComponent {
    const position = options.position || 'top-right';
    const container = this.getContainer(position);

    let toastRef: ComponentRef<VxToastComponent>;
    const injector = Injector.create({
      name: `vx-toast-injector-${_toastIdCounter++}`,
      parent: this.injector,
      providers: [
        {provide: _VX_TOAST_OPTIONS_TOKEN, useValue: options},
        {
          provide: _VX_TOAST_CLOSE_TOKEN, useValue: () => {
            if (toastRef) {
              toastRef.destroy();

              if (container.childElementCount === 0) {
                container.remove();
                this.containers[position] = undefined;
              }
            }
          }
        }
      ]
    });

    const factory = this.resolver.resolveComponentFactory(VxToastComponent);
    toastRef = factory.create(injector, undefined);
    container.appendChild(toastRef.location.nativeElement);
    this.appRef.attachView(toastRef.hostView);

    return toastRef.instance;
  }

  private getContainer(position: ToastPosition): HTMLElement {
    let container = this.containers[position];

    if (!container) {
      container = document.createElement('div');
      container.style.zIndex = `${getNextHighestZIndex()}`;
      container.className = `vx-toast-positioner ${position}`;
      document.body.appendChild(container);
      this.containers[position] = container;
    }

    return container;
  }

}
