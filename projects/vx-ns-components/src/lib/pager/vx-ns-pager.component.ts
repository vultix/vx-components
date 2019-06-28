import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren, forwardRef,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { AbstractVxPagerComponent, VX_PAGER_TOKEN } from 'vx-components-base';
import { VxNsPageComponent } from './vx-ns-page.component';

@Component({
  selector: 'AbsoluteLayout[vx-ns-pager]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // VX_PAGER_INPUTS
  inputs: ['selectedPage'],
  providers: [
    {provide: VX_PAGER_TOKEN, useExisting: forwardRef(() => VxNsPagerComponent)}
  ],
  host: {
    'class': 'vx-ns-pager'
  }
})

export class VxNsPagerComponent extends AbstractVxPagerComponent<VxNsPageComponent> {
  @ContentChildren(VxNsPageComponent)
  pages!: QueryList<VxNsPageComponent>;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
