import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface OrderData {
  name: string;
  address: string;
  paymentMethod: 'now' | 'later';
  cardNumber?: string;
}

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class OrderDialogComponent {
  order: OrderData = {
    name: '',
    address: '',
    paymentMethod: 'now'
  };

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    this.dialogRef.close({
      success: true,
      orderData: {
        ...this.data.orderData,
        ...this.order
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close({
      success: false
    });
  }
}
