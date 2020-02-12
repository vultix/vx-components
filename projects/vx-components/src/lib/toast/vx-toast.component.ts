import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef, HostListener, Inject, InjectionToken,
  OnDestroy, Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { isDefined } from '../shared/util';
import { CreateToastOptions, OpenToastOptions, ToastComponentOptions, ToastType } from './vx-toast.types';

export const _VX_TOAST_OPTIONS_TOKEN = new InjectionToken<OpenToastOptions>('_VX_TOAST_OPTIONS_TOKEN');
export const _VX_TOAST_CLOSE_TOKEN = new InjectionToken<() => void>('VX_TOAST_CLOSE_TOKEN');
const CLOSE_ANIMATION_TIME = 300;

@Component({
  selector: 'vx-toast',
  templateUrl: './vx-toast.component.html',
  styleUrls: ['./vx-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-toast',
    '[class.warn]': '_type === "warn"',
    '[class.error]': '_type === "error"',
    '[class.info]': '_type === "info"',
    '[class.success]': '_type === "success"',
    '[class.vx-show-close]': '_options?.showClose'
  }
})
export class VxToastComponent implements OnDestroy {
  @ViewChild('componentContent', { read: ViewContainerRef, static: false }) content!: ViewContainerRef;

  hasComponent = false;
  _closing = false;
  _options?: CreateToastOptions;
  _type: ToastType;

  onClose: Observable<void>;

  private contentComponentRef?: ComponentRef<any>;
  private _onClose: Subject<void>;
  constructor(private resolver: ComponentFactoryResolver, private elementRef: ElementRef<HTMLElement>,
              @Inject(_VX_TOAST_CLOSE_TOKEN) private closeCallback: Function,
              @Inject(_VX_TOAST_OPTIONS_TOKEN) options: OpenToastOptions,
              private cdr: ChangeDetectorRef) {
    this._onClose = new Subject();
    this.onClose = this._onClose.asObservable();

    this._type = options.type || 'error';
    if ('component' in options) {
      this.hasComponent = true;
      const factory = this.resolver.resolveComponentFactory(options.component);
      this.contentComponentRef = this.content.createComponent(factory);
    } else {
      this._options = this.prepareOptions(options);

      if (this._options.duration && this._options.duration > 0) {
        setTimeout(() => {
          this.close();
        }, this._options.duration);
      }
    }

  }


  @HostListener('click')
  close(): void {
    const thisEl = this.elementRef.nativeElement;
    thisEl.style.maxHeight = thisEl.offsetHeight + 'px';

    this._onClose.next();
    setTimeout(() => {
      thisEl.className += ' vx-toast-closing';
    });

    setTimeout(() => {
      this.closeCallback();
    }, CLOSE_ANIMATION_TIME);
  }

  ngOnDestroy(): void {
    if (this.contentComponentRef) {
      this.contentComponentRef.destroy();
    }
    this._onClose.complete();
  }

  private prepareOptions(options: CreateToastOptions): CreateToastOptions {
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

    return baseOptions
  }

}
