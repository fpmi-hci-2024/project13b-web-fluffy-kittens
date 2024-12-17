import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageCenterComponent } from './catalog-page-center/catalog-page-center.component';
import { MainPageModule } from '../main-page/main-page.module';
import { ProductDetailsModule } from '../product-details/product-details.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CatalogPageCenterComponent
  ],
  imports: [
    CommonModule,
    MainPageModule,
    ProductDetailsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ]
})
export class CatalogPageModule { }
