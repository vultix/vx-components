import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, registerElement } from 'nativescript-angular';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { VxNsComponentsModule } from 'vx-ns-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VxNsAutocompleteDemoComponent } from './autocomplete/vx-ns-autocomplete-demo.component';
import { VxNsButtonDemoComponent } from './button/vx-ns-button-demo.compnent';
import { CustomErrorHandler } from './custom-error-handler';
import { VxNsFormFieldDemoComponent } from './form-field/vx-ns-form-field-demo.component';
import { HomeComponent } from './home/home.component';
import { VxNsMenuDemoComponent } from './menu/vx-ns-menu-demo.component';
import { VxNsRadioDemoComponent } from './radio/vx-ns-radio-demo.component';

registerElement('PreviousNextView', () => require('nativescript-iqkeyboardmanager').PreviousNextView);

@NgModule({
  imports: [NativeScriptModule, NativeScriptFormsModule, AppRoutingModule, VxNsComponentsModule],
  declarations: [AppComponent,
    HomeComponent,
    VxNsFormFieldDemoComponent,
    VxNsRadioDemoComponent,
    VxNsMenuDemoComponent,
    VxNsAutocompleteDemoComponent,
    VxNsButtonDemoComponent
  ],
  bootstrap: [AppComponent],
  providers: [{provide: ErrorHandler, useClass: CustomErrorHandler}],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {

}
