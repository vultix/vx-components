import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren, ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {VxPagerComponent} from '../pager';


@Component({
  selector: 'vx-tab',
  template: `
    <ng-template #template>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxTabComponent {
  /** The label for the tab */
  @Input() label = '';

  @ViewChild(TemplateRef) _template: TemplateRef<any>
  @ViewChild('content') content: ElementRef;
}


@Component({
  selector: 'vx-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxTabsComponent implements AfterViewInit {
  @Output() selectedTabChange = new EventEmitter<number>();

  @ViewChild(VxPagerComponent) pager: VxPagerComponent;

  /** The list of tabs that were passed into the component */
  @ContentChildren(VxTabComponent) _tabs: QueryList<VxTabComponent>;

  /** The selected tab */
  @Input('selectedTab')
  get selectedTab(): number {
    return this.pager.selectedPage;
  }

  set selectedTab(tab: number) {
    this.pager.selectedPage = tab;
    this.cdr.markForCheck();
  };

  constructor(private cdr: ChangeDetectorRef) {

  }

  /** Sets the selected tab to be the tabIdx */
  public selectTab(tabIdx: number): void {
    this.selectedTab = tabIdx;
    this.selectedTabChange.emit(this.selectedTab);
  }

  next(): void {
    this.selectedTab++;
  }

  previous(): void {
    this.selectedTab--;
  }

  ngAfterViewInit(): void {
    // After the child pager component is created we need to re-check our bindings.
    this.cdr.detectChanges();
  }

}
