import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    DetailsComponent
  ]
})
export class ProductDetailsModule { }
