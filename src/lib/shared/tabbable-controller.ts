import {startWith} from 'rxjs/operators';
import {QueryList} from '@angular/core';


export abstract class TabbableController<T extends Tabbable> {
  protected selectedIndex = 0;
  protected enforceSelectedTabbable = true;
  private tabbables: QueryList<T>;
  private previousIndex = 0;

  abstract next(): void;

  abstract previous(): void;

  protected setSelectedIndex(idx: number): void {
    this.previousIndex = this.selectedIndex || 0;
    if (idx === this.previousIndex)
      return;

    this.selectedIndex = idx || 0;
    this.ensureSelectedTab();
    this.setTabsLeftRight();
  }

  protected setTabbables(tabbables: QueryList<T>): void {
    this.tabbables = tabbables;
    tabbables.changes.pipe(startWith(null)).subscribe(() => {
      setTimeout(() => {
        this.ensureSelectedTab();
        this.setTabsLeftRight();
      });
    });
  }

  /** Ensures that we have the correct tab selected */
  protected ensureSelectedTab(): void {
    if (this.tabbables && this.tabbables.length) {
      if (this.selectedIndex < 0 && this.enforceSelectedTabbable) {
        this.setSelectedIndex(0);
        return;
      } else if (this.selectedIndex >= this.tabbables.length && this.enforceSelectedTabbable) {
        this.setSelectedIndex(this.tabbables.length - 1);
        return;
      }

      this.tabbables.forEach(tab => tab.active = false);
      const tabToActivate = this.tabbables.toArray()[this.selectedIndex];
      if (tabToActivate)
        tabToActivate.active = true;
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
