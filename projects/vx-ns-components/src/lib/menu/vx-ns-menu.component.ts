import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as application from 'tns-core-modules/application';
import { isIOS, screen } from 'tns-core-modules/platform';
import { View } from 'tns-core-modules/ui/core/view';
import { topmost } from 'tns-core-modules/ui/frame';
import { AbsoluteLayout } from 'tns-core-modules/ui/layouts/absolute-layout';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { AbstractVxMenuComponent, Pos, Size, VX_MENU_TOKEN } from 'vx-components-base';
import { VxNsItemComponent } from './vx-ns-item.component';

declare const android: any;
declare const UIKeyboardWillShowNotification: any;
declare const UIKeyboardFrameEndUserInfoKey: any;
declare const UIKeyboardWillHideNotification: any;

let keyboardHeight = 0;
if (isIOS) {
  // func keyboardWillShow(notification: NSNotification) {
  //   let userInfo: NSDictionary = notification.userInfo!
  //   let keyboardFrame: NSValue = userInfo.valueForKey(UIKeyboardFrameEndUserInfoKey) as! NSValue
  //   let keyboardRectangle = keyboardFrame.CGRectValue()
  //   let keyboardHeight = keyboardRectangle.height
  // }
  application.ios.addNotificationObserver(UIKeyboardWillShowNotification, function(e: any) {
    const frame = e.userInfo.valueForKey(UIKeyboardFrameEndUserInfoKey);
    const rect = frame.CGRectValue;
    keyboardHeight = rect.size.height;
  });
  application.ios.addNotificationObserver(UIKeyboardWillHideNotification, function() {
    keyboardHeight = 0;
  });
}

@Component({
  selector: 'vx-ns-menu',
  templateUrl: 'vx-ns-menu.component.html',
  styleUrls: ['vx-ns-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: VX_MENU_TOKEN, useExisting: forwardRef(() => VxNsMenuComponent)
    }
  ]
})
export class VxNsMenuComponent<T> extends AbstractVxMenuComponent<T, View> implements OnDestroy {
  @ContentChildren(VxNsItemComponent)
  items!: QueryList<VxNsItemComponent<T>>;


  _screenWidth = screen.mainScreen.widthDIPs;
  _screenHeight = screen.mainScreen.heightDIPs;
  _ios = isIOS;
  @Input() autoClose: boolean | VxNsMenuAutoClose = true;
  @ViewChild('menu') menu!: ElementRef<ScrollView>;
  @ViewChild('container') container!: ElementRef<AbsoluteLayout>;
  private popupWindow?: any;
  private _hiding = false;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  get _classString(): string {
    return `vx-ns-menu ${this.visible ? 'vx-ns-menu-visible' : ''} ${this._positionStrategyClass || ''}`;
  }

  hide(): void {
    if (this._hiding) {
      return;
    }

    this._hiding = true;

    this.menu.nativeElement.animate({
      scale: {x: 1, y: 0},
      opacity: 0,
      duration: 200
    }).then(() => {
      if (isIOS) {
        this.container.nativeElement.ios.removeFromSuperview();
      } else if (this.popupWindow) {
        this.popupWindow.dismiss();
      }
      this._hiding = false;
    });


  }

  show(): void {
    if (!this.attachedTo) {
      throw new Error('Tried showing a vx-ns-menu component without an attached view');
    }

    const container = this.container.nativeElement;
    const menu = this.menu.nativeElement;
    menu.scrollToVerticalOffset(0, false);

    if (isIOS) {
      const window = application.ios.window;

      window.addSubview(container.ios);
    } else {
      const popupWindow = new android.widget.PopupWindow(application.android.currentContext);
      popupWindow.setInputMethodMode(android.widget.PopupWindow.INPUT_METHOD_NEEDED);
      popupWindow.setFocusable(false);
      popupWindow.setOutsideTouchable(false);

      const drawable = new android.graphics.drawable.ColorDrawable(0);
      // drawable.setAlpha(0);
      popupWindow.setBackgroundDrawable(drawable);
      popupWindow.setWidth(screen.mainScreen.widthPixels);
      popupWindow.setHeight(screen.mainScreen.heightPixels);

      const parent = container.android.getParent();
      if (parent) {
        parent.removeView(container.android);
      }

      popupWindow.setContentView(container.android);

      popupWindow.showAtLocation(topmost().nativeView, 0, 0, 0);
      this.popupWindow = popupWindow;
    }

    menu.opacity = 0;
    menu.scaleY = 0;

    // Wait some time for the text field to open up
    setTimeout(() => {
      this.position();

      if (this.lastPosition) {
        menu.originY = this.lastPosition.menuY === 'top' ? 0 : this.lastPosition.menuY === 'center' ? 0.5 : 1;
      }
      menu.animate({
        scale: {x: 1, y: 1},
        opacity: 1,
        duration: 200
      });

    }, 30);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.visible) {
      if (isIOS) {
        this.container.nativeElement.ios.removeFromSuperview();
      } else if (this.popupWindow) {
        this.popupWindow.dismiss();
      }
    }
  }

  _autoClose(reason: keyof VxNsMenuAutoClose) {
    if (this._shouldAutoclose(reason)) {
      this.visible = false;
    }
  }

  protected setNativePosition(pos: Pos, autoWidth: boolean): void {
    if (!this.menu || !this.menu.nativeElement) {
      return;
    }

    const el = this.menu.nativeElement;

    el.left = pos.x;
    // TODO: Where does this extra 20 pixels come from?  The IOS navbar pehaps?
    el.top = pos.y - 20;
    el.height = pos.height;
    el.width = autoWidth ? 'auto' : pos.width;
    this.container.nativeElement.requestLayout();
  }

  protected getAttachedPosition(): Pos | undefined {
    if (!this.attachedTo) {
      return;
    }

    const pos = this.attachedTo.getLocationInWindow();
    const size = this.attachedTo.getActualSize();

    return pos && size ? {...size, ...pos} : undefined;
  }

  protected getMenuPosition(): Pos | undefined {
    if (!this.menu || !this.menu.nativeElement) {
      return;
    }

    const pos = this.menu.nativeElement.getLocationInWindow();
    const size = {
      width: this.menu.nativeElement.content.getMeasuredWidth() / screen.mainScreen.scale,
      height: this.menu.nativeElement.content.getMeasuredHeight() / screen.mainScreen.scale
    };
    return pos && size ? {...size, ...pos} : undefined;
  }

  protected getViewportSize(): Size | undefined {
    const window = application.ios.window as any;
    return {width: this._screenWidth, height: this._screenHeight - keyboardHeight};
  }

  protected _shouldAutoclose(reason: keyof VxNsMenuAutoClose): boolean {
    return this.autoClose === true ? true : this.autoClose === false ? false : this.autoClose[reason] === true;
  }
}

export interface VxNsMenuAutoClose {
  itemSelect?: boolean;
  overlay?: boolean;
}
