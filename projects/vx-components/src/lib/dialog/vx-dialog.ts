import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef
} from '@angular/core';
import { AbstractVxDialog, Constructor } from 'vx-components-base';
import { OverlayRef } from '../shared/overlay-factory';
import { DialogCloseDataType, DialogDataType, VxDialogDef } from './vx-dialog-def';
import { VxDialogRef } from './vx-dialog-ref';
import { VxDialogComponent } from './vx-dialog.component';

@Injectable()
export class VxDialog extends AbstractVxDialog<HTMLElement> {
  protected dialogType = VxDialogComponent;

  constructor(resolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef) {
    super(resolver, injector, appRef);
  }

  open<ComponentType = VxDialogDef<any, any>>
  (component: Constructor<ComponentType> | TemplateRef<ComponentType>, data: DialogDataType<ComponentType>):
    VxDialogRef<ComponentType> {
    return super.open(component, data) as any;
  }

}
