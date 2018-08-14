import {Directive, Inject} from '@angular/core';
import {PAGER_TOKEN} from './pager.token';
import {VxPagerComponent} from './pager.component';

@Directive({
  selector: '[vxPagerPrevious], [vxPagerBack]',
  host: {
    '(click)': '_pager.previous()'
  }
})
export class VxPagerPreviousDirective {
  constructor(@Inject(PAGER_TOKEN) public _pager: VxPagerComponent) {
  }
}

@Directive({
  selector: '[vxPagerNext]',
  host: {
    '(click)': '_pager.next()'
  }
})
export class VxPagerNextDirective {
  constructor(@Inject(PAGER_TOKEN) public _pager: VxPagerComponent) {
  }
}
