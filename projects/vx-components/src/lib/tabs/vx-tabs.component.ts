import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VxPagerComponent } from '../pager/vx-pager.component';
import { VxTabComponent } from './vx-tab.component';

@Component({
  selector: 'vx-tabs',
  templateUrl: 'vx-tabs.component.html',
  styleUrls: ['vx-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class VxTabsComponent implements AfterViewInit {
  /**
   * The tabs that were passed into the component
   */
  @ContentChildren(VxTabComponent)
  _tabs!: QueryList<VxTabComponent>;

  @ViewChild(VxPagerComponent)
  _pager!: VxPagerComponent;

  /** The selected tab */
  @Input()
  get selectedTab(): number {
    return this._pager.selectedPage;
  }

  set selectedTab(tab: number) {
    this._pager.selectedPage = tab;
    this.cdr.markForCheck();
  };

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    // Because our selectedTab bindings depend upon our child pager we need to check bindings after the pager is created.
    this.cdr.detectChanges();
  }

  /** Sets the selected tab to be the tabIdx */
  public selectTab(tabIdx: number): void {
    this.selectedTab = tabIdx;
  }

  next(): void {
    this.selectedTab++;
  }

  previous(): void {
    this.selectedTab--;
  }
}
