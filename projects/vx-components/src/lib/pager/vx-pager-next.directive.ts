import { Directive, Inject, Optional } from '@angular/core';
import { AbstractVxPagerNextDirective, AbstractVxPagerComponent, VX_PAGER_TOKEN } from 'vx-components-base';

@Directive({
  selector: '[vxPagerNext]',
  host: {
    '(click)': '_handleClick()'
  }
})
export class VxPagerNextDirective extends AbstractVxPagerNextDirective {
  constructor(@Inject(VX_PAGER_TOKEN) @Optional() pager: AbstractVxPagerComponent<any>) {
    super(pager);
    if (!pager) {
      throw new Error('Trying to use vxPagerNext outside of a vx-pager');
    }
  }
}
