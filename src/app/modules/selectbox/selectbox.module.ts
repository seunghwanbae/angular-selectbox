import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectboxComponent } from './components/selectbox/selectbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SelectboxComponent],
  exports: [SelectboxComponent, FormsModule]
})
export class SelectboxModule { }
