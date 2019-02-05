import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AfterContentInit, ChangeDetectorRef, ContentChildren, Input, QueryList } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { AbstractVxPageComponent } from './abstract-vx-page.component';

export abstract class AbstractVxPagerComponent<P extends AbstractVxPageComponent<any>> implements AfterContentInit {
  abstract pages: QueryList<P>;

  @Input()
  get selectedPage(): number {
    return this._selectedPage;
  }

  set selectedPage(value: number) {
    value = +value || 0;

    if (this._selectedPage !== value) {
      this.previousIndex = this.selectedPage;

      this._selectedPage = value;
      this.ensureSelectedPage();
      this.cdr.markForCheck();
    }
  }

  protected _selectedPage = 0;
  protected previousIndex = 0;
  constructor(protected cdr: ChangeDetectorRef) {

  }

  ngAfterContentInit(): void {
    this.pages.changes.pipe(startWith(null)).subscribe(() => {
      this.ensureSelectedPage();
      this.cdr.markForCheck();
    })
  }

  private ensureSelectedPage(): void {
    if (this.pages && this.pages.length) {
      if (this.selectedPage < 0) {
        this.selectedPage = 0;
        return;
      } else if (this.selectedPage >= this.pages.length) {
        this.selectedPage = this.pages.length - 1;
        return;
      }

      const selectedPage = this.selectedPage;

      this.pages.forEach((page, idx) => {
        page._left = idx < selectedPage;
        page._right = idx > selectedPage;
        page._current = idx === selectedPage;
      });
    }
  }

}
