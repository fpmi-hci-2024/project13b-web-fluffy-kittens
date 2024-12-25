import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketPageCenterComponent } from './basket-page-center/basket-page-center.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    BasketPageCenterComponent,
    OrderDialogComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
  ]
})
export class BasketPageModule { }
