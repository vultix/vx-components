import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, TemplateRef, Type } from '@angular/core';
import { Constructor } from '../shared/mixins';
import { AbstractVxDialogRef } from './abstract-vx-dialog-ref';
import { AbstractVxDialogComponent } from './abstract-vx-dialog.component';

export abstract class AbstractVxDialog<ContainerType> {
  protected abstract dialogType: Constructor<AbstractVxDialogComponent<any, any, any>>;
  constructor(protected resolver: ComponentFactoryResolver, protected injector: Injector, protected appRef: ApplicationRef) {

  }

  open(component: Constructor<any> | TemplateRef<any>, data: any):
    AbstractVxDialogRef<any, any, any> {

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
