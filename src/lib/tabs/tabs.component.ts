import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList
} from '@angular/core';


@Component({
  selector: 'vx-tab',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./tab.component.scss']
})
export class VxTabComponent {
  /** The label for the tab */
  @Input() label = '';

  /** Whether this tab is the active tab */
  @HostBinding('class.active') active = false;

  @HostBinding('class.left') left = false;
  @HostBinding('class.right') right = false;
  @HostBinding('class.visible') visible: boolean;
}


@Component({
  selector: 'vx-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class VxTabsComponent implements AfterContentInit {
  _selectedTab = 0;

  /** The selected tab */
  @Input('selectedTab')
  get selectedTab(): number { return this._selectedTab; }
  set selectedTab(tab: number) {
    this.previousTab = this._selectedTab || 0;
    if (tab === this.previousTab)
      return;

    this._selectedTab = tab || 0;
    this.setTabsLeftRight();
    this.ensureSelectedTab();
  };

  @Output() selectedTabChange = new EventEmitter<number>();

  /** The list of tabs that were passed into the component */
  @ContentChildren(VxTabComponent) _tabs: QueryList<VxTabComponent>;

  private previousTab = 0;

  /** Sets the selected tab to be the tabIdx */
  public selectTab(tabIdx: number): void {
    this.selectedTab = tabIdx;
    this.selectedTabChange.emit(tabIdx);
  }


  ngAfterContentInit(): void {
    this._tabs.changes.subscribe(() => {
      setTimeout(() => {
        this.ensureSelectedTab();
        this.setTabsLeftRight();
      });
    });

    setTimeout(() => {
      this.ensureSelectedTab();
      this.setTabsLeftRight();
    });
  }

  /** Ensures that we have the correct tab selected */
  private ensureSelectedTab(): void {
    if (this._tabs && this._tabs.length) {
      if (this.selectedTab < 0 || this.selectedTab >= this._tabs.length) {
        this.selectTab(0);
      }

      this._tabs.forEach(tab => tab.active = false);
      this._tabs.toArray()[this.selectedTab].active = true;
    }
  }

  private setTabsLeftRight(): void {
    const oldTab = this.previousTab;
    const tab = this.selectedTab;
    if (this._tabs) {
      this._tabs.forEach((tb, idx) => {
        tb.left = idx < tab;
        tb.right = idx > tab;
        tb.visible = idx === oldTab || idx === tab;
      });
    }
  }
}
