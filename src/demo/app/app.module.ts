import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {VxComponentsModule} from './lib';
import {TabsDemoComponent} from './tabs-demo/tabs-demo.component';
import {Route, RouterModule} from '@angular/router';
import {InputDemoComponent} from './input-demo/input-demo.component';
import {TitleService} from './title.service';
import { CheckboxDemoComponent } from './checkbox-demo/checkbox-demo.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'tabs'},
  { path: 'tabs', component: TabsDemoComponent},
  { path: 'input', component: InputDemoComponent},
  { path: 'checkbox', component: CheckboxDemoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TabsDemoComponent,
    InputDemoComponent,
    CheckboxDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    VxComponentsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
