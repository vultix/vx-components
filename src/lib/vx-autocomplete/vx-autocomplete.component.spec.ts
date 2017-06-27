import {async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks, ComponentFixtureAutoDetect} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {VxAutocompleteComponent} from './vx-autocomplete.component';
import {InputModule} from '../vx-input';
import {VxInputComponent} from '../vx-input/vx-input.component';
import {DropdownModule} from '../vx-dropdown';
import {VxDropdownComponent} from '../vx-dropdown/vx-dropdown.component';

const STRING_ARRAY = ['United States', 'Mexico', 'Australia', 'Canada'];
const OBJECT_ARRAY = [
  {name: 'United States', value: 'US'}, {name: 'Mexico', value: 'MX'},
  {name: 'Australia', value: 'AU'}, {name: 'Canada', value: 'CA'}
];

describe('VxAutocompleteComponent', () => {
  let testComponent: SimpleAutocompleteComponent;
  let fixture: ComponentFixture<SimpleAutocompleteComponent>;
  let autocompleteComponent: VxAutocompleteComponent;
  let autocompleteNativeElement: Element;
  let autocompleteInputElement: HTMLInputElement;
  let autocompleteInputComponent: VxInputComponent;
  let autocompleteDropdownComponent: VxDropdownComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, InputModule, DropdownModule],
      declarations: [VxAutocompleteComponent, SimpleAutocompleteComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAutocompleteComponent);
    testComponent = fixture.componentInstance;

    const autocompleteDebugElement = fixture.debugElement.query(By.directive(VxAutocompleteComponent));
    autocompleteComponent = autocompleteDebugElement.componentInstance;
    autocompleteNativeElement = autocompleteDebugElement.nativeElement;
    autocompleteInputElement = <HTMLInputElement> autocompleteNativeElement.getElementsByTagName('input')[0];
    autocompleteInputComponent = fixture.debugElement.query(By.directive(VxInputComponent)).componentInstance;
    autocompleteDropdownComponent = fixture.debugElement.query(By.directive(VxDropdownComponent)).componentInstance;
  });

  it('should forward name, placeholder, and tabIndex to input', () => {
    testComponent.name = 'username';
    testComponent.tabIndex = 12;
    testComponent.placeholder = 'Username:';

    fixture.detectChanges();

    expect(autocompleteInputElement.name).toBe('username');
    expect(autocompleteInputElement.tabIndex).toBe(12);
    expect(autocompleteInputElement.placeholder).toBe('Username:');
    expect(autocompleteInputElement.title).toBe('Username:');
  });

  it('should show dropdown on focus', fakeAsync(() => {
    autocompleteInputElement.focus();

    tick();
    expect(autocompleteComponent._dropdownVisible).toBe(true);
    flushMicrotasks();
  }));

  it('should update input on item click', fakeAsync(() => {
    autocompleteComponent.items = STRING_ARRAY;
    autocompleteInputElement.focus();
    tick();
    autocompleteDropdownComponent._selectItem(STRING_ARRAY[0]);
    tick();
    tick();
    expect(autocompleteInputComponent.value).toBe(STRING_ARRAY[0]);
    flushMicrotasks();
  }));

  it('should emit value when valueField is set', fakeAsync(() => {
    autocompleteComponent.items = OBJECT_ARRAY;
    autocompleteComponent.valueField = 'value';
    autocompleteComponent.nameField = 'name';
    autocompleteInputElement.focus();
    tick();
    autocompleteDropdownComponent._selectItem(OBJECT_ARRAY[0]);
    tick();
    tick();
    expect(autocompleteInputComponent.value).toBe(OBJECT_ARRAY[0].name);
    expect(autocompleteComponent.value).toBe(OBJECT_ARRAY[0].value);
  }));

  it('should have value of the object when valueField is not set', fakeAsync(() => {
    autocompleteComponent.items = OBJECT_ARRAY;
    autocompleteComponent.nameField = 'name';
    autocompleteInputElement.focus();
    tick();
    autocompleteDropdownComponent._selectItem(OBJECT_ARRAY[0]);
    tick();
    tick();
    expect(autocompleteInputComponent.value).toBe(OBJECT_ARRAY[0].name);
    expect(autocompleteComponent.value).toBe(OBJECT_ARRAY[0]);
  }));

  it('should change value of when value changes', fakeAsync(() => {
    autocompleteComponent.items = STRING_ARRAY;
    autocompleteInputElement.focus();
    tick();
    autocompleteDropdownComponent._selectItem(STRING_ARRAY[0]);
    tick();
    tick();
    expect(autocompleteInputComponent.value).toBe(STRING_ARRAY[0]);
    expect(autocompleteComponent.value).toBe(STRING_ARRAY[0]);
    autocompleteDropdownComponent._selectItem(STRING_ARRAY[1]);
    tick();
    tick();
    expect(autocompleteInputComponent.value).toBe(STRING_ARRAY[1]);
    expect(autocompleteComponent.value).toBe(STRING_ARRAY[1]);
  }));
});


/** Simple component for testing a dropdown. */
@Component({
  template: `<vx-autocomplete [(ngModel)]="value" [name]="name" [placeholder]="placeholder" [tabIndex]="tabIndex" 
    [disabled]="disabled" [items]="items" [nameField]="nameField" [valueField]="valueField"></vx-autocomplete>`
})
class SimpleAutocompleteComponent {
  value: string|TestObject;
  name: string;
  placeholder: string;
  tabIndex: number;
  disabled: boolean;
  items: string[] | TestObject[];
  nameField: string;
  valueField: string;
}

class TestObject {
  name: string;
  value: number;
}
