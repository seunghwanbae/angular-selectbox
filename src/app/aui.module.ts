import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuiComponent } from './aui.component';
import { SelectboxModule } from './modules/selectbox/selectbox.module';
import { ButtonModule } from './modules/button/button.module';

@NgModule({
  declarations: [
    AuiComponent
  ],
  imports: [
    BrowserModule,
    SelectboxModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AuiComponent]
})
export class AuiModule { }
