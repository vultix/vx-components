import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {VxTabsComponent, VxTabComponent} from './vx-tabs.component';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';

const TABS_1 = ['Tab 1', 'Tab 2'];
const TABS_2 = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'];

describe('VxTabsComponent', () => {
  let fixture: ComponentFixture<SimpleTabsComponent>;
  let testComponent: SimpleTabsComponent;
  let tabsComponent: VxTabsComponent;
  let tabsNativeElement: Element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [VxTabsComponent, SimpleTabsComponent, VxTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTabsComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();

    const tabsDebugElement = fixture.debugElement.query(By.directive(VxTabsComponent));
    tabsComponent = tabsDebugElement.componentInstance;
    tabsNativeElement = tabsDebugElement.nativeElement;
  });

  it('should update tab labels', () => {
    testComponent.tabs = TABS_1;
    fixture.detectChanges();

    let elements = getTabLabelElements();
    expect(elements.length).toBe(TABS_1.length);
    for (let i = 0; i < elements.length; i++) {
      expect(elements[i].textContent.trim()).toBe(TABS_1[i]);
    }

    testComponent.tabs = TABS_2;
    fixture.detectChanges();
    elements = getTabLabelElements();

    expect(elements.length).toBe(TABS_2.length);
    for (let i = 0; i < elements.length; i++) {
      expect(elements[i].textContent.trim()).toBe(TABS_2[i]);
    }
  });

  it('should accept selected tab', fakeAsync(() => {
    testComponent.tabs = TABS_1;
    testComponent.selectedTab = 1;
    fixture.detectChanges();

    tick();
    fixture.detectChanges();

    const elements = getTabLabelElements();
    expect(elements[0].classList).not.toContain('active');
    expect(elements[1].classList).toContain('active');

  }));


  it('should set selected tab on click', fakeAsync(() => {
    testComponent.tabs = TABS_1;
    fixture.detectChanges();

    tick();
    fixture.detectChanges();

    const elements = getTabLabelElements();
    expect(elements[0].classList).toContain('active');

    elements[1].click();
    fixture.detectChanges();

    expect(elements[0].classList).not.toContain('active');
    expect(elements[1].classList).toContain('active');

  }));

  it('should output selected tab changes', () => {
    testComponent.tabs = TABS_1;
    testComponent.selectedTab = 0;
    fixture.detectChanges();

    const elements = getTabLabelElements();
    elements[1].click();
    fixture.detectChanges();

    expect(testComponent.selectedTab).toBe(1);
  });

  it('should not allow setting to nonexistent tab', fakeAsync((done: any) => {
    testComponent.tabs = TABS_1;
    testComponent.selectedTab = -1;
    fixture.detectChanges();

    tick();
    fixture.detectChanges();
    expect(testComponent.selectedTab).toBe(0);
  }));

  function getTabLabelElements(): HTMLSpanElement[] {
    const nodes = tabsNativeElement.querySelectorAll('.tab');
    const result: HTMLDivElement[] = [];
    for (let i = 0; i < nodes.length; i++) {
      result.push(<HTMLDivElement> nodes[i]);
    }

    return result;
  }
});

/** Simple component for testing a dropdown. */
@Component({
  template: `
  <vx-tabs [(selectedTab)]="selectedTab">
    <vx-tab *ngFor="let tab of tabs" [label]="tab"></vx-tab>
  </vx-tabs>`
})
class SimpleTabsComponent {
  tabs: string[];
  selectedTab: number;
}
