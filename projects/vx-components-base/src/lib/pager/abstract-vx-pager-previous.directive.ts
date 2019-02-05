import { AbstractVxPagerComponent } from './abstract-vx-pager.component';

export abstract class AbstractVxPagerPreviousDirective {
  constructor(protected pager: AbstractVxPagerComponent<any>) {

  }

  _handleClick(): void {
    this.pager.selectedPage --;
  }
}
