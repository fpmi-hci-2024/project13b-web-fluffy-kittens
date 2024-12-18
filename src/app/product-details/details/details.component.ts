import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: false
})
export class DetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {}

  // Закрыть окно
  close(): void {
    this.dialogRef.close();
  }

  addToCart(): void {
    console.log('Заглушка. Добавлено в корзину:', this.product.name);
  }
  onAddToFavorites() : void {
    console.log('Заглушка. Товар добавлен в избранное:', this.product.name, this.product.id)

  }
  onClose(): void {
    this.dialogRef.close();
  }
}
