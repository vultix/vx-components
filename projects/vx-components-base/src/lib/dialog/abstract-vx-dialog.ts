import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, TemplateRef, Type } from '@angular/core';
import { Constructor } from '../shared/mixins';
import { DialogCloseDataType, DialogDataType, VxDialogDef } from './abstract-vx-dialog-def';
import { AbstractVxDialogRef } from './abstract-vx-dialog-ref';
import { AbstractVxDialogComponent } from './abstract-vx-dialog.component';

export abstract class AbstractVxDialog<ContainerType> {
  protected abstract dialogType: Constructor<AbstractVxDialogComponent<any, any, any>>;
  constructor(protected resolver: ComponentFactoryResolver, protected injector: Injector, protected appRef: ApplicationRef) {

  }

  // This is confusing but essentially makes the data parameter optional if the DataType is optional.
  // Watch https://github.com/Microsoft/TypeScript/issues/12400 to remove this need.
  open<
    ComponentType extends VxDialogDef<any, any>,
    DataType extends DialogDataType<ComponentType>
    >(component: Constructor<ComponentType> | TemplateRef<ComponentType>, ...data: DataType extends undefined ? [undefined?] : [DataType]):
    AbstractVxDialogRef<ComponentType, DataType, DialogCloseDataType<ComponentType>> {

    const factory = this.resolver.resolveComponentFactory<AbstractVxDialogComponent<any, any, any>>(this.dialogType);
    const dialogRef = factory.create(this.injector);
    dialogRef.instance._init(data);
    dialogRef.instance._selfComponentRef = dialogRef;
    this.appRef.attachView(dialogRef.hostView);
    // dialogRef.changeDetectorRef.detectChanges();

    const result = dialogRef.instance._setContent(component);

    dialogRef.instance.open();
    return result;
  }
}
