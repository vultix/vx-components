import {ErrorHandler, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptFormsModule, registerElement} from 'nativescript-angular';
import {CustomErrorHandler} from './custom-error-handler';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {VxNsComponentsModule} from 'vx-ns-components';
import {VxNsFormFieldDemoComponent} from './form-field/vx-ns-form-field-demo.component';

registerElement('PreviousNextView', () => require('nativescript-iqkeyboardmanager').PreviousNextView);

@NgModule({
  imports: [NativeScriptModule, NativeScriptFormsModule, AppRoutingModule, VxNsComponentsModule],
  declarations: [AppComponent, HomeComponent, VxNsFormFieldDemoComponent],
  bootstrap: [AppComponent],
  providers: [{provide: ErrorHandler, useClass: CustomErrorHandler}],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {

}
