import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: false
})
export class DetailsComponent {
  private backendUrl = 'https://project13b-backend-fluffy-kittens.onrender.com';

  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any,
    public auth: AuthService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  addToCart(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        const customerId = user.sub;
        const url = `${this.backendUrl}/cart/${customerId}/products/${this.product.id}`;
        this.http.post(url, {}).subscribe(
          () => {
            this.toastr.success(`The product was successfully added to cart: ${this.product.name}`, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 3000,
              progressBar: true,  // Добавление индикатора прогресса
              closeButton: true   // Кнопка для закрытия уведомления
            });
            console.log(`Товар добавлен в корзину: ${this.product.name}`);
          },
          (error) => {
            this.toastr.error('Something went wrong during adding product to cart', 'Oops', {
              positionClass: 'toast-bottom-right',
              timeOut: 3000,
              progressBar: true,
              closeButton: true
            });
            console.error('Ошибка при добавлении товара в корзину:', error);
          }
        );
      }
    });
  }

  onAddToFavorites(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        const customerId = user.sub;
        const url = `${this.backendUrl}/favorites/${customerId}/products/${this.product.id}`;
        this.http.post(url, {}).subscribe(
          () => {
            this.toastr.success(`The product was successfully added to favorites: ${this.product.name}`, 'Success!', {
              positionClass: 'toast-bottom-right', // Позиция уведомления
              timeOut: 3000,
              progressBar: true,
              closeButton: true
            });
            console.log(`Товар добавлен в избранное: ${this.product.name}`);
          },
          (error) => {
            this.toastr.error('Something went wrong during adding product to favorites', 'Oops', {
              positionClass: 'toast-bottom-right',
              timeOut: 3000,
              progressBar: true,
              closeButton: true
            });
            console.error('Ошибка при добавлении товара в избранное:', error);
          }
        );
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
