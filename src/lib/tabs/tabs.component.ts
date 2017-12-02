import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList
} from '@angular/core';
import {TabbableController} from '../shared/tab-controller';


@Component({
  selector: 'vx-tab',
  template: `
    <ng-content></ng-content>`,
  styleUrls: ['../shared/tabbable.component.scss']
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
export class VxTabsComponent extends TabbableController<VxTabComponent> implements AfterContentInit {
  @Output() selectedTabChange = new EventEmitter<number>();
  /** The list of tabs that were passed into the component */
  @ContentChildren(VxTabComponent) _tabs: QueryList<VxTabComponent>;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  /** The selected tab */
  @Input('selectedTab')
  get selectedTab(): number {
    return this.selectedIndex;
  }

  set selectedTab(tab: number) {
    this.setSelectedIndex(tab);
  };

  /** Sets the selected tab to be the tabIdx */
  public selectTab(tabIdx: number): void {
    this.selectedTab = tabIdx;
    this.selectedTabChange.emit(this.selectedTab);
  }

  ngAfterContentInit(): void {
    this.setTabbables(this._tabs);
  }

}
