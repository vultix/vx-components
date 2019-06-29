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
import { DialogCloseDataType, DialogDataType, VxDialogDef } from 'vx-components-base';
import { VxDialogRef } from './vx-dialog-ref';
import { VxDialogComponent } from './vx-dialog.component';

@Injectable()
export class VxDialog extends AbstractVxDialog<HTMLElement> {
  protected dialogType = VxDialogComponent;

  constructor(resolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef) {
    super(resolver, injector, appRef);
  }

  // This is confusing but essentially makes the data parameter optional if the DataType is optional.
  // Watch https://github.com/Microsoft/TypeScript/issues/12400 to remove this need.
  open<
    ComponentType extends VxDialogDef<any, any>,
    DataType extends DialogDataType<ComponentType>
    >(component: Constructor<ComponentType> | TemplateRef<ComponentType>, ...data: DataType extends undefined ? [undefined?] : [DataType]):
    VxDialogRef<ComponentType> {
    return super.open(component, data[0]) as VxDialogRef<ComponentType>;
  }

}
