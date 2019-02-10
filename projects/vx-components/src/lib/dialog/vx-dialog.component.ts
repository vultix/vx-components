import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ComponentRef, ElementRef, Injector, Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { AbstractVxDialogComponent } from 'vx-components-base';
import { OverlayRef } from '../shared/overlay-factory';
import { DialogCloseDataType, DialogDataType, VxDialogDef } from './vx-dialog-def';
import { VxDialogRef } from './vx-dialog-ref';

@Component({
  selector: 'vx-dialog',
  templateUrl: './vx-dialog.component.html',
  styleUrls: ['./vx-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-dialog'
  }
})
export class VxDialogComponent<ComponentType = VxDialogDef<any, any>,
  DataType extends DialogDataType<ComponentType> = DialogDataType<ComponentType>,
  CloseDataType extends DialogCloseDataType<ComponentType> = DialogCloseDataType<ComponentType>>
  extends AbstractVxDialogComponent<ComponentType, DataType, CloseDataType> {

  overlay: OverlayRef;

  @ViewChild('container', {read: ViewContainerRef})
  _contentViewContainer!: ViewContainerRef;

  protected refType = VxDialogRef;

  constructor(resolver: ComponentFactoryResolver, injector: Injector, private el: ElementRef<HTMLElement>, private renderer: Renderer2) {
    super(resolver, injector);

    this.overlay = new OverlayRef(['vx-dialog-overlay'], ['vx-dialog-container']);
  }

  open(): void {
    this.overlay.container.append(this.el.nativeElement);

    this.overlay.showOverlay();
  }

  protected destroyNative(): void {
    if (this.overlay) {
      this.overlay.destroy();
    }
  }


  protected animateClosing(): void {
    this.renderer.addClass(this.el.nativeElement, 'vx-dialog-closing');
  }
}
