import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavoritesCenterComponent } from './favorites-center/favorites-center.component';



@NgModule({
  declarations: [
    FavoritesCenterComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class FavoritesPageModule { }
