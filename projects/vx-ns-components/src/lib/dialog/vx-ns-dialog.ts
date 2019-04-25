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
import { VxDialogDef } from '../../../../vx-components/src/lib/dialog/vx-dialog-def';
import { DialogCloseDataType, DialogDataType, VxNsDialogDef } from './vx-ns-dialog-def';
import { VxNsDialogRef } from './vx-ns-dialog-ref';
import { VxNsDialogComponent } from './vx-ns-dialog.component';

@Injectable()
export class VxNsDialog extends AbstractVxDialog<HTMLElement> {
  protected dialogType = VxNsDialogComponent;

  constructor(resolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef) {
    super(resolver, injector, appRef);
  }

  // This is confusing but essentially makes the data parameter optional if the DataType is optional.
  // Watch https://github.com/Microsoft/TypeScript/issues/12400 to remove this need.
  open<
    ComponentType extends VxNsDialogDef<any, any>,
    DataType extends DialogDataType<ComponentType>
    >(component: Constructor<ComponentType> | TemplateRef<ComponentType>, ...data: DataType extends undefined ? [undefined?] : [DataType]):
    VxNsDialogRef<ComponentType> {
    return super.open(component, data) as VxNsDialogRef<ComponentType>;
  }

}
