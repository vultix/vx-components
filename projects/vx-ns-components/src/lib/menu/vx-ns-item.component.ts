import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { View } from 'tns-core-modules/ui/core/view';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures';
import { Label } from 'tns-core-modules/ui/label';
import { AbstractVxItemComponent, AbstractVxMenuComponent, VX_MENU_TOKEN } from 'vx-components-base';

@Component({
  selector: '[vx-ns-item]',
  templateUrl: 'vx-ns-item.component.html',
  styleUrls: ['vx-ns-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vx-ns-item]': 'true',
    '[class.vx-ns-disabled]': 'disabled',
    '[class.vx-ns-active]': '_active',
    '(tap)': '_handleSelect()',
    '(touch)': 'handleTouch($event)'
  }
})
export class VxNsItemComponent<T> extends AbstractVxItemComponent<T> {
  _active = false;

  @Input() text!: string;

  constructor(private _el: ElementRef<View>, cdr: ChangeDetectorRef,
              @Inject(VX_MENU_TOKEN) @Optional() _menu?: AbstractVxMenuComponent<T, any>) {
    super(cdr, _menu);
  }

  getTextContent(): string {
    if (this._child) {
      return this._child.getTextContent();
    }
    return this.getTextFromView(this._el.nativeElement);
  }

  handleTouch(event: TouchGestureEventData): void {
    if (this.disabled) {
      this._active = false;
      return;
    }

    this._active = event.action === 'down' || event.action === 'move';
  }

  private getTextFromView(el: View): string {
    if (el instanceof Label) {
      return el.text;
    } else {
      let text = '';
      el.eachChildView((child) => {
        const childText = this.getTextFromView(child);
        if (childText.length) {
          text += childText + ' ';
        }
        return true;
      });

      return text.trim();
    }
  }
}
