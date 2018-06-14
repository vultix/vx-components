import {
  AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, Output,
  QueryList,
  Renderer2
} from '@angular/core';
import {VxButtonComponent, VxButtonGroupToken} from '../button';
import {Subject} from 'rxjs';
import {startWith, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'vx-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  providers: [
    {provide: VxButtonGroupToken, useExisting: forwardRef(() => VxButtonGroupComponent)}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxButtonGroupComponent {
  @Input()
  value: any;

  @Output()
  valueChange = new EventEmitter<any>();

  handleButtonClick(button: VxButtonComponent): void {
    this.value = button.value;
    this.valueChange.emit(this.value);
  }

}
