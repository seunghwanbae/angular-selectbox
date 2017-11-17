import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectboxComponent } from './components/selectbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SelectboxComponent],
  exports: [SelectboxComponent]
})
export class SelectboxModule { }
