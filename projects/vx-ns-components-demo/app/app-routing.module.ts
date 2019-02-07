import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { VxNsAutocompleteDemoComponent } from './autocomplete/vx-ns-autocomplete-demo.component';
import { VxNsButtonDemoComponent } from './button/vx-ns-button-demo.compnent';
import { VxNsFormFieldDemoComponent } from './form-field/vx-ns-form-field-demo.component';
import { HomeComponent } from './home/home.component';
import { VxNsMenuDemoComponent } from './menu/vx-ns-menu-demo.component';
import { VxNsPagerDemoComponent } from './pager/vx-ns-pager-demo.component';
import { VxNsRadioDemoComponent } from './radio/vx-ns-radio-demo.component';
import { VxNsStepperDemoComponent } from './stepper/vx-ns-stepper-demo.component';
import { VxNsVerticalExpanderDemoComponent } from './vertical-expander/vx-ns-vertical-expander-demo.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'form-field', component: VxNsFormFieldDemoComponent},
  {path: 'radio', component: VxNsRadioDemoComponent},
  {path: 'menu', component: VxNsMenuDemoComponent},
  {path: 'autocomplete', component: VxNsAutocompleteDemoComponent},
  {path: 'button', component: VxNsButtonDemoComponent},
  {path: 'pager', component: VxNsPagerDemoComponent},
  {path: 'vertical-expander', component: VxNsVerticalExpanderDemoComponent},
  {path: 'stepper', component: VxNsStepperDemoComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
