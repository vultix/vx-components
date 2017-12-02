import {
  AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CreateToastOptions, ToastComponentOptions, ToastOptions} from './toast.types';
import {isDefined} from '../shared/util';

const CLOSE_ANIMATION_TIME = 450;
@Component({
  selector: 'vx-toast-component',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class VxToastComponent implements OnDestroy {
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;
  options: CreateToastOptions;

  /** @internal */
  hasComponent = false;

  /** @internal */
  closing = false;
  /**@internal */
  maxHeight = 300;

  private contentComponentRef: ComponentRef<any>;
  private componentRef: ComponentRef<this>;
  private container: HTMLElement;
  constructor(private resolver: ComponentFactoryResolver, private elementRef: ElementRef) {
  }


  /** @internal */
  create(ref: ComponentRef<this>, container: HTMLElement, content: Type<any>, options?: ToastComponentOptions<any>): void;
  create(ref: ComponentRef<this>, container: HTMLElement, content: null, options: CreateToastOptions): void;
  create(ref: ComponentRef<this>, container: HTMLElement, content: Type<any> | null,
         options?: CreateToastOptions | ToastComponentOptions<any>): void {
    this.componentRef = ref;
    this.container = container;
    this.handleOptions(options);

    if (content) {
      this.hasComponent = true;
      const factory = this.resolver.resolveComponentFactory(content);
      const created = this.content.createComponent(factory);
      const instance = created.instance;
      // if (instance.onDialogOpen) {
      //   instance.onDialogOpen(this, data);
      // }
      this.contentComponentRef = created;
    }
    setTimeout(() => {
      this.close();
    }, this.options.duration);
  }

  close(): void {
    this.closing = true;
    this.maxHeight = this.elementRef.nativeElement.offsetHeight + 10;
    setTimeout(() => {
      this.componentRef.destroy();
    }, CLOSE_ANIMATION_TIME);
  }

  ngOnDestroy(): void {
    if (this.contentComponentRef)
      this.contentComponentRef.destroy();
    if (this.container)
      this.container.remove();
    // this.onClose.complete();
  }

  private handleOptions(options?: any): void {
    options = options || {};
    const baseOptions: CreateToastOptions =  {
      position: 'top-right',
      duration: 3000,
      text: '',
      type: 'success',
      showClose: true
    };
    baseOptions.position = isDefined(options.position) ? options.position : baseOptions.position;
    baseOptions.duration = isDefined(options.duration) ? options.duration : baseOptions.duration;
    baseOptions.text = isDefined(options.text) ? options.text : baseOptions.text;
    baseOptions.type = isDefined(options.type) ? options.type : baseOptions.type;
    baseOptions.showClose = isDefined(options.showClose) ? options.showClose : baseOptions.showClose;
    baseOptions.title = options.title;

    this.options = baseOptions;
  }

}
