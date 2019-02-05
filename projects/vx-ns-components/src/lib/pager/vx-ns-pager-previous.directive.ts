import { Directive, Inject, Optional } from '@angular/core';
import { AbstractVxPagerPreviousDirective, AbstractVxPagerComponent, VX_PAGER_TOKEN } from 'vx-components-base';

@Directive({
  selector: '[vxNsPagerPrevious]',
  host: {
    '(tap)': '_handleClick()'
  }
})
export class VxNsPagerPreviousDirective extends AbstractVxPagerPreviousDirective {
  constructor(@Inject(VX_PAGER_TOKEN) @Optional() pager: AbstractVxPagerComponent<any>) {
    super(pager);

    if (!pager) {
      throw new Error('Trying to use vxNsPagerPrevious outside of a vx-ns-pager');
    }
  }
}
