import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SlideToggleDemoComponent} from './slide-toggle-demo.component';

describe('SlideToggleDemoComponent', () => {
  let component: SlideToggleDemoComponent;
  let fixture: ComponentFixture<SlideToggleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideToggleDemoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideToggleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
