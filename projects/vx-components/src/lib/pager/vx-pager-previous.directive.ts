import { Directive, Inject, Optional } from '@angular/core';
import { AbstractVxPagerPreviousDirective, AbstractVxPagerComponent, VX_PAGER_TOKEN } from 'vx-components-base';

@Directive({
  selector: '[vxPagerPrevious]',
  host: {
    '(click)': '_handleClick()'
  }
})
export class VxPagerPreviousDirective extends AbstractVxPagerPreviousDirective {
  constructor(@Inject(VX_PAGER_TOKEN) @Optional() pager: AbstractVxPagerComponent<any>) {
    super(pager);

    if (!pager) {
      throw new Error('Trying to use vxPagerPrevious outside of a vx-pager');
    }
  }
}
