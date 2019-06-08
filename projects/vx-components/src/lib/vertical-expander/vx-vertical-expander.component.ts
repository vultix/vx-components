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
  _showContent = false;

  private timeouts: any[] = [];
  constructor(cdr: ChangeDetectorRef, protected element: ElementRef<HTMLElement>) {
    super(cdr);
  }

  protected animateExpansion(): void {
    // TODO: Angular universal support here (and in this.initialize())?
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    if (this.expanded) {
      // Mark for check happens in caller.
      this._showContent = true;

      // We need this timeout to allow the content to render
      this.timeouts.push(setTimeout(() => this.initializeAnimation()))
    } else {
      this.initializeAnimation()
    }
  }

  protected initialize(): void {
    this.element.nativeElement.style.height = this.expanded ? 'auto' : '0';
  }

  private initializeAnimation(): void {
    if (!this.content) {
      return;
    }

    const contentEl = this.content.nativeElement;
    const thisEl = this.element.nativeElement;
    let contentSize = contentEl.offsetHeight;
    // Initialize the height
    thisEl.style.height = this.expanded ? '0' : `${contentSize}px`;

    // Trigger the animation (Because of css we need to do this on another frame;
    const initializeTimeout = setTimeout(() => {
      contentSize = contentEl.offsetHeight;
      thisEl.style.height = this.expanded ? `${contentSize}px` : '0';
    });


    // Post animation changes;
    const finalizeTimeout = setTimeout(() => {
      this.finalizeAnimation()
    }, 300);

    this.timeouts.push(initializeTimeout, finalizeTimeout);
  }

  private finalizeAnimation(): void {
    if (this.expanded) {
      this.element.nativeElement.style.height = 'auto';
    } else {
      this._showContent = false;
      this.cdr.markForCheck();
    }
  }

}
