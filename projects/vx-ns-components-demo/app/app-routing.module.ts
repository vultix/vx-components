import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from 'nativescript-angular';
import {HomeComponent} from './home/home.component';
import {VxNsFormFieldDemoComponent} from './form-field/vx-ns-form-field-demo.component';
import {VxNsRadioDemoComponent} from './radio/vx-ns-radio-demo.component';
import {VxNsMenuDemoComponent} from './menu/vx-ns-menu-demo.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'form-field', component: VxNsFormFieldDemoComponent},
  {path: 'radio', component: VxNsRadioDemoComponent},
  {path: 'menu', component: VxNsMenuDemoComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
