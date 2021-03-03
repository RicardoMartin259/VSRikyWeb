import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[ProductFormComponent]
})
export class ProductFormModule { }
