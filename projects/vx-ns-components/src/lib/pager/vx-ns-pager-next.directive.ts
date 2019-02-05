import { Directive, Inject, Optional } from '@angular/core';
import { AbstractVxPagerNextDirective, AbstractVxPagerComponent, VX_PAGER_TOKEN } from 'vx-components-base';

@Directive({
  selector: '[vxNsPagerNext]',
  host: {
    '(tap)': '_handleClick()'
  }
})
export class VxNsPagerNextDirective extends AbstractVxPagerNextDirective {
  constructor(@Inject(VX_PAGER_TOKEN) @Optional() pager: AbstractVxPagerComponent<any>) {
    super(pager);
    if (!pager) {
      throw new Error('Trying to use vxNsPagerNext outside of a vx-ns-pager');
    }
  }
}
