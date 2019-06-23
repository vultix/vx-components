import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, HostListener, Inject,
  Optional, PLATFORM_ID,
  Self, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { fromEvent, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractVxSliderComponent, ErrorStateMatcher } from 'vx-components-base';
import { getTouchPos } from '../shared/util';

@Component({
  selector: 'vx-slider',
  templateUrl: 'vx-slider.component.html',
  styleUrls: ['vx-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'vx-slider'
  }
})

export class VxSliderComponent extends AbstractVxSliderComponent {
  @ViewChild('bar', {static: false}) _bar!: ElementRef<HTMLElement>;

  private touching = false;
  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);
  }


  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  handleTouchStart(event: TouchEvent | MouseEvent): boolean {
    this.touching = true;
    return false;
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  handleTouchMove(event: TouchEvent | MouseEvent): boolean {
    if (this.touching) {
      this.updateValue(event);
      return false;
    }

    return true;
  }

  @HostListener('window:mouseup', ['$event'])
  @HostListener('window:touchend', ['$event'])
  @HostListener('click', ['$event'])
  handleTouchEnd(event: TouchEvent | MouseEvent): boolean {
    if (this.touching) {
      this.touching = false;
      this.updateValue(event);
      return false;
    }

    return true;
  }



  private updateValue(event: MouseEvent | TouchEvent) {
    const {x} = getTouchPos(event);
    const bar = this._bar.nativeElement as HTMLDivElement;
    const {left, width} = bar.getBoundingClientRect();
    this.updateValueForTouch(x, width, left);

    event.stopPropagation();
    event.preventDefault();
  }
}
