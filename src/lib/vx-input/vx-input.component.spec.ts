import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {VxInputComponent} from './vx-input.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {VxNumberSpinnerComponent} from './vx-number-spinner.component';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('VxInputComponent', () => {
  let testComponent: SimpleInputComponent;
  let fixture: ComponentFixture<SimpleInputComponent>;
  let inputComponent: VxInputComponent;
  let inputNativeElement: Element;
  let inputInputElement: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [VxInputComponent, VxNumberSpinnerComponent, SimpleInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleInputComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();

    const inputDebugElement = fixture.debugElement.query(By.directive(VxInputComponent));
    inputComponent = inputDebugElement.componentInstance;
    inputNativeElement = inputDebugElement.nativeElement;
    inputInputElement = inputNativeElement.querySelector('input');
  });

  it('should forward type, name, tabIndex, and placeholder to Input', () => {
    testComponent.type = 'number';
    testComponent.name = 'username';
    testComponent.tabIndex = 12;
    testComponent.placeholder = 'Username:';
    fixture.detectChanges();

    expect(inputInputElement.type).toBe('number');
    expect(inputInputElement.name).toBe('username');
    expect(inputInputElement.tabIndex).toBe(12);
    expect(inputInputElement.placeholder).toBe('Username:');
    expect(inputInputElement.title).toBe('Username:');
  });

  it('should detect input focus change and emit hasFocus', () => {
      fixture.detectChanges();
      inputInputElement.focus();
      expect(testComponent.hasFocus).toBe(true);
      expect(inputComponent.hasFocus).toBe(true);

      inputInputElement.blur();
      fixture.detectChanges();
      expect(testComponent.hasFocus).toBe(false);
      expect(inputComponent.hasFocus).toBe(false);
  });

  it('should focus input when setHasFocus is called', () => {
    expect(inputComponent.hasFocus).toBe(false);
    inputComponent.setHasFocus(true);
    fixture.detectChanges();

    expect(inputComponent.hasFocus).toBe(true);
    expect(inputInputElement).toBe(document.activeElement);
    expect(testComponent.hasFocus).toBe(true);

    inputComponent.setHasFocus(false);
    fixture.detectChanges();

    expect(inputComponent.hasFocus).toBe(false);
    expect(inputInputElement).not.toBe(document.activeElement);
    expect(testComponent.hasFocus).toBe(false);
  });

  it('should not lose focus when clicked in container but not on the input', fakeAsync(() => {
    expect(inputInputElement).not.toBe(document.activeElement);
    expect(inputComponent.hasFocus).toBe(false);
    fixture.detectChanges();
    inputInputElement.focus();
    expect(inputInputElement).toBe(document.activeElement);
    expect(inputComponent.hasFocus).toBe(true);

    inputInputElement.parentElement.click();
    fixture.detectChanges();
    tick();
    expect(inputInputElement).toBe(document.activeElement);
    expect(inputComponent.hasFocus).toBe(true);
  }));

  describe('input[type=number]', () => {
    let numberSpinnerComponent: VxNumberSpinnerComponent;
    let numberSpinnerElement: Element;

    beforeEach(() => {
      testComponent.type = 'number';
      fixture.detectChanges();
      const numberSpinnerDebugElement = fixture.debugElement.query(By.directive(VxNumberSpinnerComponent));
      numberSpinnerComponent = numberSpinnerDebugElement.componentInstance;
      numberSpinnerElement = numberSpinnerDebugElement.nativeElement;
    });

    it('should have a number spinner', () => {
      expect(numberSpinnerComponent).toBeTruthy();
      expect(numberSpinnerElement).toBeTruthy();
    });

    it('should only accept numeric value', fakeAsync(() => {
      testComponent.value = 'some string';
      fixture.detectChanges();

      tick();
      expect(testComponent.value).toBe(null);

      testComponent.value = 32;
      fixture.detectChanges();

      tick();
      expect(inputComponent.value).toBe(32);
    }));

    it('should change with arrow keys', fakeAsync(() => {
      testComponent.value = 0;
      fixture.detectChanges();
      tick();
      expect(inputComponent.value).toBe(0);

      triggerKeyEvent(inputInputElement, 'keydown', 'ArrowUp');
      fixture.detectChanges();
      expect(inputComponent.value).toBe(1);
      expect(testComponent.value).toBe(1);

      triggerKeyEvent(inputInputElement, 'keydown', 'ArrowDown');
      fixture.detectChanges();
      expect(inputComponent.value).toBe(0);
      expect(testComponent.value).toBe(0);
    }));

    it('should change with button click', fakeAsync(() => {
      testComponent.value = 0;
      fixture.detectChanges();
      tick();
      expect(inputComponent.value).toBe(0);

      (<HTMLDivElement> numberSpinnerElement.children[0]).dispatchEvent(new MouseEvent('mousedown'));
      (<HTMLDivElement> numberSpinnerElement.children[0]).dispatchEvent(new MouseEvent('mouseup'));
      tick();
      fixture.detectChanges();

      expect(inputComponent.value).toBe(1);
      expect(testComponent.value).toBe(1);

      (<HTMLDivElement> numberSpinnerElement.children[1]).dispatchEvent(new MouseEvent('mousedown'));
      (<HTMLDivElement> numberSpinnerElement.children[1]).dispatchEvent(new MouseEvent('mouseup'));
      tick();
      fixture.detectChanges();

      expect(inputComponent.value).toBe(0);
      expect(testComponent.value).toBe(0);
    }));
  });

  function triggerKeyEvent(element: Element, event: 'keydown' | 'keyup', key: string) {
    let keyCode: number;
    switch (key) {
      case 'ArrowDown':
        keyCode = 40;
        break;
      case 'ArrowUp':
        keyCode = 38;
        break;
      case 'Enter':
        keyCode = 13;
        break;
    }
    const evt = new KeyboardEvent(event, {
      'key' : key,
      'bubbles': true
    });

    // TODO: what is a better way to add a keyCode to this event?

    // Keycode Hack
    Object.defineProperty(evt, 'keyCode', {
      get : function() {
        return keyCode;
      }
    });
    Object.defineProperty(evt, 'which', {
      get : function() {
        return keyCode;
      }
    });

    element.dispatchEvent(evt);
  }
});


/** Simple component for testing a dropdown. */
@Component({
  template: `<vx-input [(ngModel)]="value" [type]="type" [name]="name" [placeholder]="placeholder" [tabIndex]="tabIndex" 
    [disabled]="inputDisabled" (hasFocusChange)="setHasFocus($event)" [min]="min" [max]="max"></vx-input>`
})
class SimpleInputComponent {
  hasFocus: boolean;

  value: string|number;
  type: string;
  name: string;
  placeholder: string;
  tabIndex: number;
  inputDisabled: boolean;
  min: number;
  max: number;

  setHasFocus(focus: boolean) {
    this.hasFocus = focus;
  }
}
