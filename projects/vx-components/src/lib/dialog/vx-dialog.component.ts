import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y/';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ComponentRef, ElementRef, Inject, Injector, Optional, PLATFORM_ID, Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
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
    'class': 'vx-dialog',
    '(keydown.escape)': 'escapePress.next()'
  }
})
export class VxDialogComponent<ComponentType = VxDialogDef<any, any>,
  DataType extends DialogDataType<ComponentType> = DialogDataType<ComponentType>,
  CloseDataType extends DialogCloseDataType<ComponentType> = DialogCloseDataType<ComponentType>>
  extends AbstractVxDialogComponent<ComponentType, DataType, CloseDataType> {

  /** Element that was focused before the dialog was opened. Save this to restore upon close. */
  private _elementFocusedBeforeDialogWasOpened?: HTMLElement;

  overlay?: OverlayRef;

  escapePress = new Subject<void>();

  @ViewChild('container', {read: ViewContainerRef})
  _contentViewContainer!: ViewContainerRef;

  protected refType = VxDialogRef;

  private focusTrap?: FocusTrap;
  private isPlatformBrowser: boolean;

  constructor(resolver: ComponentFactoryResolver, injector: Injector,
              private el: ElementRef<HTMLElement>,
              private renderer: Renderer2,
              private focusTrapFactory: FocusTrapFactory,
              @Inject(PLATFORM_ID) platformId: Object) {
    super(resolver, injector);

    this.isPlatformBrowser = isPlatformBrowser(platformId);
    if (this.isPlatformBrowser) {
      this.overlay = new OverlayRef(['vx-dialog-overlay'], ['vx-dialog-container']);
    }
  }

  open(): void {
    this.savePreviouslyFocusedElement();

    if (this.overlay) {
      this.overlay.container.append(this.el.nativeElement);

      this.overlay.showOverlay();
    }

    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(this.el.nativeElement);
      this.focusTrap.focusInitialElementWhenReady();
    }
  }

  protected destroyNative(): void {
    if (this.overlay) {
      this.overlay.destroy();
    }

    this.escapePress.complete();

    this.restoreFocus();
  }


  protected animateClosing(): void {
    this.renderer.addClass(this.el.nativeElement, 'vx-dialog-closing');
  }

  /** Restores focus to the element that was focused before the dialog opened. */
  private restoreFocus() {
    const toFocus = this._elementFocusedBeforeDialogWasOpened;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      toFocus.focus();
    }

    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }

  /** Saves a reference to the element that was focused before the dialog was opened. */
  private savePreviouslyFocusedElement() {
    if (this.isPlatformBrowser) {
      this._elementFocusedBeforeDialogWasOpened = document.activeElement as HTMLElement;

      // if (this._elementFocusedBeforeDialogWasOpened &&
      //   typeof this._elementFocusedBeforeDialogWasOpened.blur === 'function') {
      //   this._elementFocusedBeforeDialogWasOpened.blur();
      // }
    }
  }
}
