import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, HostListener, Inject, Input,
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
    'class': 'vx-slider',
    '[attr.tabIndex]': 'disabled ? -1 : tabIndex',
  }
})

export class VxSliderComponent extends AbstractVxSliderComponent {
  @Input() tabIndex = 0;
  @ViewChild('bar', {static: false}) _bar!: ElementRef<HTMLElement>;

  private touching = false;
  constructor(
    cdr: ChangeDetectorRef,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    private el: ElementRef<HTMLElement>) {
    super(cdr, errorStateMatcher, ngControl, parentForm, parentFormGroup);
  }


  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  handleTouchStart(event: TouchEvent | MouseEvent): boolean {
    this.touching = true;
    this.el.nativeElement.focus();
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

  @HostListener('keydown.ArrowLeft', ['false', '1'])
  @HostListener('keydown.shift.ArrowLeft', ['false', '10'])
  @HostListener('keydown.ArrowDown', ['false', '1'])
  @HostListener('keydown.shift.ArrowDown', ['false', '10'])
  @HostListener('keydown.ArrowRight', ['true', '1'])
  @HostListener('keydown.shift.ArrowRight', ['true', '10'])
  @HostListener('keydown.ArrowUp', ['true', '1'])
  @HostListener('keydown.shift.ArrowUp', ['true', '10'])
  _handleArrow(goUp: boolean, multiplier: number) {
    const amount = this.step * multiplier;

    if (goUp) {
      this.value += amount;
    } else {
      this.value -= amount;
    }
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
