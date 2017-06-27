import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {DropdownComponent} from './dropdown.component';
import {CommonModule} from '@angular/common';

const DEFAULT_TEXT = 'Default Text';
const DEFAULT_TEXT_2 = 'Default Text 2';

const ITEMS_STRINGS = ['Item 1', 'Item 2', 'Item 3'];
const ITEMS_OBJECTS = [{name: 'Item 1', value: 0}, {name: 'Item 2', value: 1}, {name: 'Item 3', value: 2}];

describe('DropdownComponent', () => {
  let fixture: ComponentFixture<SimpleDropdownComponent>;
  let testComponent: SimpleDropdownComponent;
  let dropdownComponent: DropdownComponent;
  let dropdownNativeElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [DropdownComponent, SimpleDropdownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDropdownComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;

    const dropdownDebugElement = fixture.debugElement.query(By.directive(DropdownComponent));
    dropdownComponent = dropdownDebugElement.componentInstance;
    dropdownNativeElement = dropdownDebugElement.nativeElement.querySelector('.dropdown');
  });

  it('should change visibility', () => {
    expectVisibilityToBe(false);

    testComponent.dropdownVisible = true;
    fixture.detectChanges();

    expectVisibilityToBe(true);

    testComponent.dropdownVisible = false;
    fixture.detectChanges();

    expectVisibilityToBe(false);
  });

  it('should toggle visibility', () => {
    expectVisibilityToBe(false);

    dropdownComponent.toggle();
    fixture.detectChanges();

    expectVisibilityToBe(true);

    dropdownComponent.toggle();
    fixture.detectChanges();

    expectVisibilityToBe(false);
  });

  it('should return hasFocus correctly', () => {
    expect(dropdownComponent.hasFocus()).toBe(false);

    dropdownNativeElement.focus();
    expect(dropdownComponent.hasFocus()).toBe(true);

    dropdownNativeElement.blur();
    expect(dropdownComponent.hasFocus()).toBe(false);
  });

  it('should display defaultText when no items', () => {
    let defaultEl = dropdownNativeElement.querySelector('.default');

    expect(testComponent.items).toBe(undefined);
    expect(defaultEl.textContent.trim()).toBe(DEFAULT_TEXT);

    testComponent.items = [];
    testComponent.defaultText = DEFAULT_TEXT_2;
    fixture.detectChanges();

    expect(defaultEl.textContent.trim()).toBe(DEFAULT_TEXT_2);

    testComponent.items = ['an item'];
    fixture.detectChanges();

    defaultEl = dropdownNativeElement.querySelector('.default');
    expect(defaultEl).toBeFalsy();
  });

  it('should display items', () => {
    testComponent.items = ITEMS_STRINGS;
    fixture.detectChanges();

    let elements = getItemElements();
    expect(elements.length).toBe(ITEMS_STRINGS.length);

    for (let i = 0; i < elements.length; i++) {
      expect(elements[i].textContent.trim()).toBe(ITEMS_STRINGS[i]);
    }

    testComponent.items = ITEMS_OBJECTS;
    testComponent.nameField = 'name';
    fixture.detectChanges();

    elements = getItemElements();
    expect(elements.length).toBe(ITEMS_STRINGS.length);

    for (let i = 0; i < elements.length; i++) {
      expect(elements[i].textContent.trim()).toBe(ITEMS_OBJECTS[i]['name']);
    }
  });

  it('should handle valueField', () => {
    testComponent.items = ITEMS_OBJECTS;
    fixture.detectChanges();

    const elements = getItemElements();
    elements[1].click();
    fixture.detectChanges();

    expect(testComponent.selectedItem).toBe(ITEMS_OBJECTS[1]);

    testComponent.valueField = 'value';
    fixture.detectChanges();

    elements[1].click();
    fixture.detectChanges();

    expect(testComponent.selectedItem).toBe(ITEMS_OBJECTS[1].value);
  });

  it('should change focus with arrows', () => {
    testComponent.items = ITEMS_STRINGS;
    fixture.detectChanges();

    const elements = getItemElements();
    expect(dropdownComponent._focusedIdx).toBe(0);
    expect(elements[0].classList).toContain('focused');

    triggerKeyEvent(dropdownNativeElement, 'keydown', 'ArrowDown');
    fixture.detectChanges();

    expect(dropdownComponent._focusedIdx).toBe(1);
    expect(elements[1].classList).toContain('focused');

    triggerKeyEvent(dropdownNativeElement, 'keydown', 'ArrowUp');
    fixture.detectChanges();

    expect(dropdownComponent._focusedIdx).toBe(0);
    expect(elements[0].classList).toContain('focused');
  });

  it('should select focused element with enter key up', () => {
    testComponent.items = ITEMS_STRINGS;
    testComponent.dropdownVisible = true;
    fixture.detectChanges();

    triggerKeyEvent(dropdownNativeElement, 'keyup', 'enter');
    fixture.detectChanges();

    expect(testComponent.selectedItem).toBe(ITEMS_STRINGS[0]);

    triggerKeyEvent(dropdownNativeElement, 'keydown', 'ArrowDown');
    triggerKeyEvent(dropdownNativeElement, 'keyup', 'enter');

    expect(testComponent.selectedItem).toBe(ITEMS_STRINGS[1]);
  });

  it('should highlight focused element with enter key down', () => {
    testComponent.items = ITEMS_STRINGS;
    testComponent.dropdownVisible = true;
    fixture.detectChanges();
    const item = getItemElements()[0];

    expect(item.classList).not.toContain('active');

    triggerKeyEvent(dropdownNativeElement, 'keydown', 'enter');
    fixture.detectChanges();

    expect(item.classList).toContain('active');
  });

  it('should close if auto close', () => {
    testComponent.autoClose = true;
    testComponent.dropdownVisible = true;
    fixture.detectChanges();
    const overlayNativeElement = <HTMLDivElement> dropdownNativeElement.parentElement.querySelector('.overlay');

    overlayNativeElement.click();
    fixture.detectChanges();

    expect(testComponent.dropdownVisible).toBe(false);

    testComponent.autoClose = false;
    testComponent.dropdownVisible = true;
    fixture.detectChanges();

    overlayNativeElement.click();
    fixture.detectChanges();

    expect(testComponent.dropdownVisible).toBe(true);
  });

  function expectVisibilityToBe(visible: boolean) {
    expect(dropdownComponent.visible).toBe(visible);
    expect(testComponent.dropdownVisible).toBe(visible);

    if (visible) {
      expect(dropdownNativeElement.classList).toContain('visible');
    } else {
      expect(dropdownNativeElement.classList).not.toContain('visible');
    }
  }

  function getItemElements(): HTMLSpanElement[] {
    const nodes = dropdownNativeElement.querySelectorAll('.item');
    const result: HTMLSpanElement[] = [];
    for (let i = 0; i < nodes.length; i++) {
      result.push(<HTMLSpanElement> nodes[i]);
    }

    return result;
  }

  function triggerKeyEvent(element: Element, event: 'keydown' | 'keyup', key: string) {
    const evt = new KeyboardEvent(event, {
      'key' : key,
      'bubbles': true
    });
    element.dispatchEvent(evt);
  }
});


/** Simple component for testing a dropdown. */
@Component({
  template: `
  <vx-dropdown #dropdown [items]="items" (itemClick)="dropdownClick($event)" 
    [(visible)]="dropdownVisible" [nameField]="nameField" [valueField]="valueField" 
    [defaultText]="defaultText" [autoClose]="autoClose">
  </vx-dropdown>`
})
class SimpleDropdownComponent {
  selectedItem: any;

  items: any;
  dropdownVisible = false;
  nameField: string;
  valueField: string;
  defaultText = DEFAULT_TEXT;
  autoClose: boolean;

  dropdownClick(item: any) {
    this.selectedItem = item;
  }
}
