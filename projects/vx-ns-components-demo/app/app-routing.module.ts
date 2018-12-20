import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { VxNsAutocompleteDemoComponent } from './autocomplete/vx-ns-autocomplete-demo.component';
import { VxNsFormFieldDemoComponent } from './form-field/vx-ns-form-field-demo.component';
import { HomeComponent } from './home/home.component';
import { VxNsMenuDemoComponent } from './menu/vx-ns-menu-demo.component';
import { VxNsRadioDemoComponent } from './radio/vx-ns-radio-demo.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'form-field', component: VxNsFormFieldDemoComponent},
  {path: 'radio', component: VxNsRadioDemoComponent},
  {path: 'menu', component: VxNsMenuDemoComponent},
  {path: 'autocomplete', component: VxNsAutocompleteDemoComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
