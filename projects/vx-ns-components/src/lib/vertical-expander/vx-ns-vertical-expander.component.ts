import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { AbstractVxVerticalExpanderComponent } from 'vx-components-base';
import { createAnimation, EasingFunctions } from '../shared/animations';

// TODO: overscroll
// if (isIOS) {
//   container.ios.scrollEnabled = false;
// }

@Component({
  selector: 'ScrollView[vx-ns-vertical-expander]',
  templateUrl: 'vx-ns-vertical-expander.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-ns-vertical-expander',
    '[class.vx-ns-expanded]': 'expanded'
  }
})

export class VxNsVerticalExpanderComponent extends AbstractVxVerticalExpanderComponent {
  private subscription?: Subscription;

  constructor(cdr: ChangeDetectorRef, protected element: ElementRef<ScrollView>, private zone: NgZone) {
    super(cdr);
  }

  protected animateExpansion(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    const container = this.element.nativeElement;
    const content = container.content;
    const openHeight = content.getActualSize().height;
    const curHeight = container.getActualSize().height;
    const diff = this.expanded ? openHeight - curHeight : -curHeight;
    this.zone.runOutsideAngular(() => {
      const startTime = Date.now();
      this.subscription = createAnimation(300, EasingFunctions.easeInOutQuad)
        .pipe(map(t => t * diff))
        .subscribe(amount => {
          if (amount === diff && this.expanded) {
            container.height = 'auto';
          } else {
            container.height = curHeight + amount;
          }
        });
    });
  }

  protected initialize(): void {
    this.element.nativeElement.on('loaded', () => {
        this.element.nativeElement.height = this.expanded ?  'auto' : 0;
    })
  }

}
