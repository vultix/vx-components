import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  QueryList
} from '@angular/core';
import {startWith} from 'rxjs/operators';
import {VxPageComponent} from './page.component';
import {PAGER_TOKEN} from './pager.token';

@Component({
  selector: 'vx-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
  providers: [{provide: PAGER_TOKEN, useExisting: forwardRef(() => VxPagerComponent)}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxPagerComponent implements AfterContentInit {
  @ContentChildren(VxPageComponent, {descendants: true}) pages: QueryList<VxPageComponent>;

  @Input()
  get selectedPage(): number {
    return this._selectedPage;
  }

  set selectedPage(value: number) {
    if (this._selectedPage !== value) {
      this.previousIndex = this.selectedPage;

      this._selectedPage = +value || 0;
      this.ensureSelectedPage();
      this.cdr.markForCheck();
    }
  }

  private _selectedPage = 0;

  private previousIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    this.pages.changes.pipe(startWith(null)).subscribe(() => {
      this.ensureSelectedPage();
      this.cdr.markForCheck();
    })
  }

  next(): void {
    this.selectedPage++;
  }

  previous(): void {
    this.selectedPage--;
  }

  /** Ensures that we have the correct tab selected */
  private ensureSelectedPage(): void {
    if (this.pages && this.pages.length) {
      if (this.selectedPage < 0) {
        this.selectedPage = 0;
        return;
      } else if (this.selectedPage >= this.pages.length) {
        this.selectedPage = this.pages.length - 1;
        return;
      }

      const oldPage = this.previousIndex;
      const selectedPage = this.selectedPage;

      this.pages.forEach((tb, idx) => {
        tb._current = idx === selectedPage;
        tb._left = idx < selectedPage;
        tb._right = idx > selectedPage;
        tb._visible = idx === oldPage || idx === selectedPage;
      });
    }
  }
}
