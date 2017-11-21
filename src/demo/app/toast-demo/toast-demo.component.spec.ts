import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastDemoComponent } from './toast-demo.component';

describe('ToastDemoComponent', () => {
  let component: ToastDemoComponent;
  let fixture: ComponentFixture<ToastDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
