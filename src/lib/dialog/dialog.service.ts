import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Type} from '@angular/core';
import {VxDialogComponent} from './dialog.component';
import {BaseDialogOptions, DialogBodyOptions, OnDialogOpen} from './dialog.types';
import {getHighestZIdx} from '../Util';

@Injectable()
export class VxDialog {
  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) {
  }
  open(options: DialogBodyOptions): VxDialogComponent;
  open(component: Type<OnDialogOpen<undefined> | NotOnDialogOpen>, options?: BaseDialogOptions): VxDialogComponent;
  open<T, K extends T>(component: Type<OnDialogOpen<T>>, options: BaseDialogOptions | null, data: K): VxDialogComponent;
  open(componentOrOptions: any, optionsOrData?: any, data?: any): VxDialogComponent {
    const container = createOverlay();

    const factory = this.resolver.resolveComponentFactory(VxDialogComponent);
    const dialog = factory.create(this.injector, undefined, container);
    this.appRef.attachView(dialog.hostView);

    if (typeof componentOrOptions === 'function') {
      // the input is a component
      dialog.instance._setContent(componentOrOptions, optionsOrData, data);
    } else {
      // the input is dialog options
      dialog.instance._setContent(null, componentOrOptions, optionsOrData);
    }

    dialog.instance._setComponentRef(dialog);
    dialog.instance._setContainer(container);


    return dialog.instance;
  }
}

function createOverlay(): HTMLElement {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.zIndex = `${getHighestZIdx()}`;

  document.body.appendChild(container);
  return container;
}

export interface NotOnDialogOpen {
  onDialogOpen?: undefined;
  [key: string]: any;
}
