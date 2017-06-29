import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {VxCheckboxComponent} from './checkbox.component';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

const TAB_INDEX = 2;
const NAME = 'username';

describe('VxCheckboxComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [VxCheckboxComponent, SingleCheckboxComponent, NgModelCheckboxComponent]
    })
      .compileComponents();
  }));

  describe('basic behaviors', () => {
    let fixture: ComponentFixture<SingleCheckboxComponent>;
    let testComponent: SingleCheckboxComponent;
    let checkboxComponent: VxCheckboxComponent;
    let checkboxNativeElement: Element;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLSpanElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleCheckboxComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;

      const checkboxDebugElement = fixture.debugElement.query(By.directive(VxCheckboxComponent));
      checkboxComponent = checkboxDebugElement.componentInstance;
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
      labelElement = <HTMLInputElement>checkboxNativeElement.querySelector('span');
    });

    it('should toggle checked', () => {
      expectCheckedToBe(false);

      testComponent.isChecked = true;
      fixture.detectChanges();

      expectCheckedToBe(true);
    });

    it('should toggle when toggle is called', () => {
      expectCheckedToBe(false);

      checkboxComponent.toggle();
      fixture.detectChanges();

      expectCheckedToBe(true);

      checkboxComponent.toggle();
      fixture.detectChanges();

      expectCheckedToBe(false);
    });

    it('should set tabIndex to -1 when disabled', () => {
      expectTabIndexToBe(TAB_INDEX);

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expectTabIndexToBe(-1);

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expectTabIndexToBe(TAB_INDEX);
    });

    it('should pass name to input', () => {
      expect(inputElement.getAttribute('name')).toBe(NAME);
    });

    it('should toggle on click', () => {
      expect(testComponent.isChecked).toBe(false);

      labelElement.click();
      fixture.detectChanges();

      expect(testComponent.isChecked).toBe(true);

      labelElement.click();
      fixture.detectChanges();

      expect(testComponent.isChecked).toBe(false);
    });

    function expectCheckedToBe(checked: boolean) {
      expect(checkboxComponent.checked).toBe(checked);
      expect(inputElement.checked).toBe(checked);
      expect(testComponent.isChecked).toBe(checked);
      if (checked) {
        expect(checkboxNativeElement.classList).toContain('checked');
      } else {
        expect(checkboxNativeElement.classList).not.toContain('checked');
      }
    }

    function expectTabIndexToBe(tabIndex: number) {
      expect(checkboxComponent.tabIndex).toBe(tabIndex);
      expect(checkboxNativeElement.getAttribute('tabIndex')).toBe(tabIndex + '');
    }
  });

  describe('with ngModel', () => {
    let fixture: ComponentFixture<NgModelCheckboxComponent>;
    let testComponent: NgModelCheckboxComponent;
    let checkboxComponent: VxCheckboxComponent;
    let checkboxNativeElement: Element;

    beforeEach(() => {
      fixture = TestBed.createComponent(NgModelCheckboxComponent);
      fixture.detectChanges();

      const checkboxDebugElement = fixture.debugElement.query(By.directive(VxCheckboxComponent));
      checkboxComponent = checkboxDebugElement.componentInstance;
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      testComponent = fixture.componentInstance;
    });

    it('should toggle ngModel when checked changes', () => {
      expect(testComponent.isCheckedNgModel).toBe(false);
      expect(testComponent.isChecked).toBe(false);
      expect(checkboxComponent.checked).toBe(false);

      testComponent.isChecked = true;
      fixture.detectChanges();

      expect(testComponent.isCheckedNgModel).toBe(true);
      expect(checkboxComponent.checked).toBe(true);
    });
  });
});


/** Simple component for testing a single checkbox. */
@Component({
  template: `
  <div>
    <vx-checkbox [(checked)]="isChecked" [disabled]="isDisabled" [tabIndex]="tabIndex" [name]="name"></vx-checkbox>
  </div>`
})
class SingleCheckboxComponent {
  isChecked = false;
  isDisabled = false;
  tabIndex = TAB_INDEX;
  name = NAME;
}

/** Simple component for testing a checkbox that has the ngModel attribute */
@Component({
  template: `
  <div>
    <vx-checkbox [(checked)]="isChecked" [(ngModel)]="isCheckedNgModel"></vx-checkbox>
  </div>`
})
class NgModelCheckboxComponent {
  isChecked = false;
  isCheckedNgModel = false;
}

