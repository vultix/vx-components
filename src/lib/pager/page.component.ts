import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding} from '@angular/core';

@Component({
  selector: 'vx-page',
  template: `
    <ng-content></ng-content>`,
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxPageComponent {
  @HostBinding('class.current') _current = false;

  @HostBinding('class.left') _left = false;
  @HostBinding('class.right') _right = false;
  @HostBinding('class.visible') _visible: boolean;

  constructor(private cdr: ChangeDetectorRef) {
  }
}
