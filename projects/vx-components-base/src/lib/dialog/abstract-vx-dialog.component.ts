import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { Constructor } from '../shared/mixins';
import { DialogCloseDataType, DialogDataType, VxDialogDef } from './abstract-vx-dialog-def';
import { AbstractVxDialogRef } from './abstract-vx-dialog-ref';

const ANIMATION_TIME = 300;
let _dialogIdCounter = 0;

export abstract class AbstractVxDialogComponent<ComponentType = VxDialogDef<any, any>,
  DataType extends DialogDataType<ComponentType> = DialogDataType<ComponentType>,
  CloseDataType extends DialogCloseDataType<ComponentType> = DialogCloseDataType<ComponentType>>
  implements OnDestroy {

  componentInstance!: ComponentType;
  data!: DataType;
  onClose = new Subject<CloseDataType>();

  abstract _contentViewContainer: ViewContainerRef;

  _selfComponentRef!: ComponentRef<AbstractVxDialogComponent<ComponentType, DataType, CloseDataType>>;
  protected contentComponentRef?: ComponentRef<ComponentType>;
  protected abstract refType: Constructor<AbstractVxDialogRef<ComponentType, DataType, CloseDataType>>;
  constructor(protected resolver: ComponentFactoryResolver, protected injector: Injector) {
  }

  _init(data: DataType) {
    this.data = data;
  }

  _setContent(content: Constructor<ComponentType> | TemplateRef<ComponentType>):
    AbstractVxDialogRef<ComponentType, DataType, CloseDataType> {
    const ref = new this.refType(this);

    if (content instanceof TemplateRef) {
      this.componentInstance = this._contentViewContainer.createEmbeddedView(content).context;
    } else {
      const factory = this.resolver.resolveComponentFactory(content);
      const injector = Injector.create({
        name: `vx-dialog-injector-${_dialogIdCounter++}`,
        parent: this.injector,
        providers: [
          {provide: this.refType, useValue: ref}
        ]
      });
      this.contentComponentRef = this._contentViewContainer.createComponent(factory, undefined, injector);
      this.componentInstance = this.contentComponentRef.instance;
    }
    return ref;
  }

  abstract open(): void;

  close(closeData: CloseDataType): void {
    this.onClose.next(closeData);
    this.onClose.complete();
    this.animateClosing();

    setTimeout(() => {
      this._selfComponentRef.destroy();
    }, ANIMATION_TIME);
  }

  ngOnDestroy(): void {
    if (this.contentComponentRef) {
      this.contentComponentRef.destroy();
    }
    this.destroyNative();

  }

  protected abstract animateClosing(): void;
  protected abstract destroyNative(): void;
}
