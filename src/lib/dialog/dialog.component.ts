import {
  AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, OnDestroy, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DialogOptions} from './dialog.types';
import {VxDialogActionsDirective} from './dialog.directives';
import {InteractivityChecker} from './interactivity-checker';

const CLOSE_ANIMATION_TIME = 300;
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

  constructor(private resolver: ComponentFactoryResolver) {
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
    const children = this.dialog.nativeElement.querySelectorAll('*');
    for (const child of children) {
      if (InteractivityChecker.isFocusable(child) && InteractivityChecker.isTabbable(child)) {
        child.focus();
        break;
      }
    }

    if (this.buttons) {
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

  _setComponentRef(componentRef: ComponentRef<this>): void {
    this.componentRef = componentRef;
  }

  close(closeData?: any): void {
    this.onClose.next(closeData);
    this._closing = true;

    setTimeout(() => {
      this.componentRef.destroy();
    }, CLOSE_ANIMATION_TIME);
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
    if (this.contentComponentRef)
      this.contentComponentRef.destroy();
    if (this.container)
      this.container.remove();
    this.onClose.complete();
  }
}
