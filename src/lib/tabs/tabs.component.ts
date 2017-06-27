import {
  Component, AfterViewInit, ContentChildren, QueryList, Input, Output, EventEmitter,
  HostBinding
} from '@angular/core';


@Component({
  selector: 'vx-tab',
  template: `<ng-content></ng-content>`,
  styleUrls: ['tab.component.scss']
})
export class TabComponent {
  /** The label for the tab */
  @Input() label = '';

  /** Whether this tab is the active tab */
  @HostBinding('class.active') active = false;

  @HostBinding('class.fromLeft') fromLeft = false;
}


@Component({
  selector: 'vx-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss']
})
export class TabsComponent implements AfterViewInit {
  _selectedTab = 0;

  /** The selected tab */
  @Input('selectedTab')
  get selectedTab() { return this._selectedTab; }
  set selectedTab(tab: number) {
    this._selectedTab = tab || 0;
    this.ensureSelectedTab();
  };

  @Output() selectedTabChange = new EventEmitter<number>();

  /** The list of tabs that were passed into the component */
  @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;

  /** Sets the selected tab to be the tabIdx */
  public selectTab(tabIdx: number) {
    this.selectedTab = tabIdx;
    this.selectedTabChange.emit(tabIdx);
  }


  ngAfterViewInit(): void {
    this._tabs.changes.subscribe(() => {
      setTimeout(() => this.ensureSelectedTab(), 0);
    });

    setTimeout(() => this.ensureSelectedTab(), 0);
  }

  /** Ensures that we have the correct tab selected */
  private ensureSelectedTab() {
    if (this._tabs && this._tabs.length) {
      if (this.selectedTab < 0 || this.selectedTab >= this._tabs.length) {
        this.selectTab(0);
      }

      this._tabs.forEach((tab) => tab.active = false);
      this._tabs.toArray()[this.selectedTab].active = true;
    }
  }
}
