import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ComponentRef, ElementRef, Injector, Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { Color, isAndroid, isIOS, View, ViewBase } from 'tns-core-modules/ui/core/view';
import { Page } from 'tns-core-modules/ui/page';
import { AbstractVxDialogComponent } from 'vx-components-base';
import { DialogCloseDataType, DialogDataType, VxNsDialogDef } from './vx-ns-dialog-def';
import { createVxNsDialogInternal, VxNsDialogInternal } from './vx-ns-dialog-internal';
import { VxNsDialogRef } from './vx-ns-dialog-ref';

@Component({
  templateUrl: './vx-ns-dialog.component.html',
  styleUrls: ['./vx-ns-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VxNsDialogComponent<ComponentType = VxNsDialogDef<any, any>,
  DataType extends DialogDataType<ComponentType> = DialogDataType<ComponentType>,
  CloseDataType extends DialogCloseDataType<ComponentType> = DialogCloseDataType<ComponentType>>
  extends AbstractVxDialogComponent<ComponentType, DataType, CloseDataType> {

  _closing = false;
  overlayTap = new Subject<void>();
  backButtonPressed = new Subject<void>();

  @ViewChild('container', {read: ViewContainerRef, static: true})
  _contentViewContainer!: ViewContainerRef;

  page!: Page;
  protected refType = VxNsDialogRef;
  private dialogInternal?: VxNsDialogInternal;
  private _cancelOverlayTap = false;
  constructor(resolver: ComponentFactoryResolver, injector: Injector, private cdr: ChangeDetectorRef, private renderer: Renderer2) {
    super(resolver, injector);

  }

  open(): void {
    const ref = this._selfComponentRef;
    const componentView = ref.location.nativeElement as View;
    // if (componentView.parent) {
    //   componentView.parent._removeView(componentView);
    // }

    const page = new Page();
    (page as any)._setupAsRootView({});
    page.style.backgroundColor = new Color(0, 0, 0, 0);

    if (isIOS) {
      ref.changeDetectorRef.detectChanges();

      if (this.contentComponentRef) {
        this.contentComponentRef.changeDetectorRef.detectChanges();
      }
    }
    page.content = componentView;

    this.dialogInternal = createVxNsDialogInternal(page, this.backButtonPressed);
    this.dialogInternal.open();

  }

  _overlayTapped(fromIOS = false): void {
    // On ios we need to wait because the events propagate from parent to child.
    if (isIOS && !fromIOS) {
      setTimeout(() => {
        this._overlayTapped(true);
      }, 0);
      return;
    }

    if (this._cancelOverlayTap) {
      this._cancelOverlayTap = false;
      return;
    }

    this.overlayTap.next();
  }

  _dialogTapped(): void {
    this._cancelOverlayTap = true;
  }

  protected destroyNative(): void {
    this.overlayTap.complete();
    this.backButtonPressed.complete();

    if (this.dialogInternal) {
      this.dialogInternal.close();
      this.dialogInternal = undefined;
    }

  }


  protected animateClosing(): void {
    this._closing = true;
    this.cdr.markForCheck();
  }
}
