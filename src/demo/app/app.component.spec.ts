import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {VxComponentsModule} from '../../lib';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        VxComponentsModule
      ],
      declarations: [
        AppComponent
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
