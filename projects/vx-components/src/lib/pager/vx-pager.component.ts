import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren, forwardRef,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { AbstractVxPagerComponent, VX_PAGER_TOKEN } from 'vx-components-base';
import { VxPageComponent } from './vx-page.component';

@Component({
  selector: 'vx-pager',
  template: `<ng-content></ng-content>`,
  styleUrls: [`./vx-pager.component.scss`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: VX_PAGER_TOKEN, useExisting: forwardRef(() => VxPagerComponent)}
  ],
  host: {
    'class': 'vx-pager'
  }
})

export class VxPagerComponent extends AbstractVxPagerComponent<VxPageComponent> {
  @ContentChildren(VxPageComponent)
  pages!: QueryList<VxPageComponent>;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
