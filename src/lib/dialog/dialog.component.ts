import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  NgZone,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DialogOptions} from './dialog.types';
import {FocusTrap} from './focus-trap';

const ANIMATION_TIME = 300;
@Component({
  selector: 'vx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  host: {
    '[class.vxDialog]': 'true'
  }
})
export class VxDialogComponent implements OnDestroy, AfterViewInit {
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;
  onClose = new Subject<any>();
  dialogOptions: DialogOptions = {body: ''};
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('buttons') buttons: ElementRef;

  _closing = false;
  _hasComponent = false;
  private componentRef: ComponentRef<this>;
  private contentComponentRef?: ComponentRef<any>;
  private container: HTMLElement;
  private focusTrap: FocusTrap;
  private _elementFocusedBeforeDialogWasOpened: HTMLElement;

  constructor(private resolver: ComponentFactoryResolver, private zone: NgZone) {
  }

  _setContent(content: Type<any> | null, options?: DialogOptions | null, data?: any): void {
    this.dialogOptions = options || {body: ''};

    if (content) {
      this._hasComponent = true;
      const factory = this.resolver.resolveComponentFactory(content);
      const created = this.content.createComponent(factory);
      const instance = created.instance;
      if (instance.onDialogOpen) {
        instance.onDialogOpen(this, data);
      }
      this.contentComponentRef = created;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.focusInitial(), ANIMATION_TIME);
  }

  _setComponentRef(componentRef: ComponentRef<this>): void {
    this.componentRef = componentRef;
  }

  close(closeData?: any): void {
    this.onClose.next(closeData);
    this._closing = true;

    setTimeout(() => {
      this.componentRef.destroy();
    }, ANIMATION_TIME);
  }

  _setContainer(container: HTMLElement): void {
    this.container = container;
  }

  _overlayClick(): void {
    if (this.dialogOptions && this.dialogOptions.disableClose) {
      return;
    }
    this.close();
  }

  ngOnDestroy(): void {
    this.restoreFocus();

    if (this.contentComponentRef)
      this.contentComponentRef.destroy();
    if (this.container)
      this.container.remove();
    this.onClose.complete();
  }

  private async focusInitial(): Promise<void> {
    this._elementFocusedBeforeDialogWasOpened = document.activeElement as HTMLElement;
    this.focusTrap = new FocusTrap(this.container, this.zone, document);
    await this.focusTrap.focusInitialElementWhenReady();

    if (this.dialogOptions.defaultButtonIdx && this.buttons) {
      const buttonContainer = this.buttons.nativeElement as HTMLDivElement;

      if (buttonContainer.children && buttonContainer.children.length) {
        const defaultButtonIdx = this.dialogOptions.defaultButtonIdx || 0;
        const child = buttonContainer.children[defaultButtonIdx] as HTMLButtonElement;
        if (!child) {
          throw new Error(`Invalid defaultButtonIdx: ${defaultButtonIdx}`)
        }
        child.focus();
      }
    }
  }

  /** Restores focus to the element that was focused before the dialog opened. */
  private restoreFocus(): void {
    const toFocus = this._elementFocusedBeforeDialogWasOpened;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      toFocus.focus();
    }

    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }
}
