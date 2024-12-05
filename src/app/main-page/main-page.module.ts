import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageButtonComponent } from './main-page-button/main-page-button.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MainPageCenterComponent } from './main-page-center/main-page-center.component';
import { MainPageIconComponent } from './main-page-icon/main-page-icon.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainPageButtonComponent,
    NavigationBarComponent,
    MainPageCenterComponent,
    MainPageIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: 
  [
    NavigationBarComponent,
    MainPageCenterComponent
  ]
})
export class MainPageModule { }
