import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DoCheck, ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { AbstractVxVerticalExpanderComponent } from 'vx-components-base';

@Component({
  selector: 'vx-vertical-expander',
  templateUrl: 'vx-vertical-expander.component.html',
  styleUrls: ['vx-vertical-expander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'vx-vertical-expander',
    '[class.vx-expanded]': 'expanded'
  }
})

export class VxVerticalExpanderComponent extends AbstractVxVerticalExpanderComponent {
  @ViewChild('content') content!: ElementRef<HTMLElement>;

  private timeouts: any[] = [];
  constructor(cdr: ChangeDetectorRef, protected element: ElementRef<HTMLElement>) {
    super(cdr);
  }

  protected animateExpansion(): void {
    if (!this.content) {
      return;
    }
    // TODO: Angular universal support here?

    this.timeouts.forEach(clearTimeout);

    const contentEl = this.content.nativeElement;
    const thisEl = this.element.nativeElement;
    let contentSize = contentEl.offsetHeight;
    // Initialize the height
    thisEl.style.height = this.expanded ? '0' : `${contentSize}px`;

    // Trigger the animation (Because of css we need to do this on another frame;
    const firstTimeout = setTimeout(() => {
      contentSize = contentEl.offsetHeight;
      thisEl.style.height = this.expanded ? `${contentSize}px` : '0';
    });

    // Post animation changes;
    const secondTimeout = setTimeout(() => {
      if (this.expanded) {
        thisEl.style.height = 'auto';
      }
    }, 300);

    this.timeouts = [firstTimeout, secondTimeout];
  }

}
