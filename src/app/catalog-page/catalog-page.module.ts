import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageCenterComponent } from './catalog-page-center/catalog-page-center.component';
import { MainPageModule } from '../main-page/main-page.module';



@NgModule({
  declarations: [
    CatalogPageCenterComponent
  ],
  imports: [
    CommonModule,
    MainPageModule
  ]
})
export class CatalogPageModule { }
