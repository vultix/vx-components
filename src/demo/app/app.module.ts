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
import { AutocompleteDemoComponent } from './autocomplete-demo/autocomplete-demo.component';
import {HighlightCodeDirective} from './highlight-code.directive';
import {DialogDemoComponent} from './dialog-demo/dialog-demo.component';
import {DialogDemoDialogComponent} from './dialog-demo/dialog-demo-dialog.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'tabs'},
  { path: 'tabs', component: TabsDemoComponent},
  { path: 'input', component: InputDemoComponent},
  { path: 'checkbox', component: CheckboxDemoComponent},
  { path: 'autocomplete', component: AutocompleteDemoComponent},
  { path: 'dialog', component: DialogDemoComponent},
  { path: '**', redirectTo: 'tabs'}
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
    DialogDemoDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    VxComponentsModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [DialogDemoDialogComponent],
  providers: [TitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
