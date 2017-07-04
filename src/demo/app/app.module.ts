import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {VxComponentsModule} from './lib';
import {TabsDemoComponent} from './tabs-demo/tabs-demo.component';
import {Route, RouterModule} from '@angular/router';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'tabs'},
  { path: 'tabs', component: TabsDemoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TabsDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    VxComponentsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
