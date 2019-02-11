import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef
} from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { AbstractVxDialog, Constructor, AbstractVxDialogComponent } from 'vx-components-base';
import { DialogCloseDataType, DialogDataType, VxNsDialogDef } from './vx-ns-dialog-def';
import { VxNsDialogRef } from './vx-ns-dialog-ref';
import { VxNsDialogComponent } from './vx-ns-dialog.component';

@Injectable()
export class VxNsDialog extends AbstractVxDialog<HTMLElement> {
  protected dialogType = VxNsDialogComponent;

  constructor(resolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef) {
    super(resolver, injector, appRef);
  }

  open<ComponentType = VxNsDialogDef<any, any>>
  (component: Constructor<ComponentType> | TemplateRef<ComponentType>, data: DialogDataType<ComponentType>):
    VxNsDialogRef<ComponentType> {
    return super.open(component, data) as any;
  }

}
