import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageButtonComponent } from './main-page-button/main-page-button.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MainPageCenterComponent } from './main-page-center/main-page-center.component';
import { MainPageIconComponent } from './main-page-icon/main-page-icon.component';
import { RouterModule } from '@angular/router';
import { AuthButtonComponent } from "./auth-button/auth-button.component";
import { AuthModule } from '@auth0/auth0-angular';



@NgModule({
  declarations: [
    MainPageButtonComponent,
    NavigationBarComponent,
    MainPageCenterComponent,
    MainPageIconComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthButtonComponent,
    AuthModule
],
  exports: 
  [
    NavigationBarComponent,
    MainPageCenterComponent
  ]
})
export class MainPageModule { }
