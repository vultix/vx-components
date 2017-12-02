import {ChangeDetectorRef, QueryList} from '@angular/core';
import 'rxjs/add/operator/startWith';

export class TabbableController<T extends Tabbable> {
  protected selectedIndex = 0;
  private tabbables: QueryList<T>;
  private previousIndex = 0;

  protected setSelectedIndex(idx: number): void {
    this.previousIndex = this.selectedIndex || 0;
    if (idx === this.previousIndex)
      return;

    this.selectedIndex = idx || 0;
    this.setTabsLeftRight();
    this.ensureSelectedTab();
  }

  constructor(private cdr: ChangeDetectorRef) {

  }

  protected setTabbables(tabbables: QueryList<T>): void {
    this.tabbables = tabbables;
    tabbables.changes.startWith(null).subscribe(() => {
      this.ensureSelectedTab();
      this.setTabsLeftRight();
      this.cdr.markForCheck();
    });
  }

  /** Ensures that we have the correct tab selected */
  private ensureSelectedTab(): void {
    if (this.tabbables && this.tabbables.length) {
      if (this.selectedIndex < 0 || this.selectedIndex >= this.tabbables.length) {
        this.setSelectedIndex(0);
        return;
      }

      this.tabbables.forEach(tab => tab.active = false);
      this.tabbables.toArray()[this.selectedIndex].active = true;
    }
  }

  private setTabsLeftRight(): void {
    const oldTab = this.previousIndex;
    const tab = this.selectedIndex;
    if (this.tabbables) {
      this.tabbables.forEach((tb, idx) => {
        tb.left = idx < tab;
        tb.right = idx > tab;
        tb.visible = idx === oldTab || idx === tab;
      });
    }
  }
}

export interface Tabbable {
  active: boolean;
  left: boolean;
  right: boolean;
  visible: boolean;
}
