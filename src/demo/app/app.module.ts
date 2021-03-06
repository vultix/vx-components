import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {VxComponentsModule} from './lib';
import {TabsDemoComponent} from './tabs-demo/tabs-demo.component';
import {Route, RouterModule} from '@angular/router';
import {InputDemoComponent} from './input-demo/input-demo.component';
import {TitleService} from './title.service';
import {CheckboxDemoComponent} from './checkbox-demo/checkbox-demo.component';
import {AutocompleteDemoComponent} from './autocomplete-demo/autocomplete-demo.component';
import {HighlightCodeDirective} from './highlight-code.directive';
import {DialogDemoComponent} from './dialog-demo/dialog-demo.component';
import {DialogDemoDialogComponent} from './dialog-demo/dialog-demo-dialog.component';
import {RadioDemoComponent} from './radio-demo/radio-demo.component';
import {ToastDemoComponent} from './toast-demo/toast-demo.component';
import {StepperDemoComponent} from './stepper-demo/stepper-demo.component';
import {SpinnerDemoComponent} from './spinner-demo/spinner-demo.component';
import {MenuDemoComponent} from './menu-demo/menu-demo-component';
import {SlideToggleDemoComponent} from './slide-toggle-demo/slide-toggle-demo.component';
import {SliderDemoComponent} from './slider-demo/slider-demo.component';
import {ButtonGroupDemoComponent} from './button-group-demo/button-group-demo.component';
import {PagerDemoComponent} from './pager-demo/pager-demo.component';
import {ThemingComponent} from './theming/theming.component';
import {HttpClientModule} from '@angular/common/http';
import {ThemingService} from './theming/theming.service';
import {ColorPickerModule} from 'ngx-color-picker';

const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'tabs'},
  {path: 'tabs', component: TabsDemoComponent},
  {path: 'input', component: InputDemoComponent},
  {path: 'checkbox', component: CheckboxDemoComponent},
  {path: 'autocomplete', component: AutocompleteDemoComponent},
  {path: 'dialog', component: DialogDemoComponent},
  {path: 'radio', component: RadioDemoComponent},
  {path: 'toast', component: ToastDemoComponent},
  {path: 'stepper', component: StepperDemoComponent},
  {path: 'spinner', component: SpinnerDemoComponent},
  {path: 'menu', component: MenuDemoComponent},
  {path: 'slide-toggle', component: SlideToggleDemoComponent},
  {path: 'slider', component: SliderDemoComponent},
  {path: 'button-group', component: ButtonGroupDemoComponent},
  {path: 'pager', component: PagerDemoComponent},
  {path: 'theming', component: ThemingComponent},
  {path: '**', redirectTo: 'tabs'}
];

@NgModule({
  declarations: [
    AppComponent,
    TabsDemoComponent,
    InputDemoComponent,
    CheckboxDemoComponent,
    AutocompleteDemoComponent,
    HighlightCodeDirective,
    DialogDemoComponent,
    DialogDemoDialogComponent,
    RadioDemoComponent,
    ToastDemoComponent,
    StepperDemoComponent,
    SpinnerDemoComponent,
    MenuDemoComponent,
    SlideToggleDemoComponent,
    SliderDemoComponent,
    ButtonGroupDemoComponent,
    PagerDemoComponent,
    ThemingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    VxComponentsModule,
    ColorPickerModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [DialogDemoDialogComponent],
  providers: [TitleService, ThemingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
