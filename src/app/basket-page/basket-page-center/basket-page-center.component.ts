import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { switchMap, of, forkJoin, catchError, tap, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-basket-page-center',
  templateUrl: './basket-page-center.component.html',
  styleUrls: ['./basket-page-center.component.css'],
  standalone: false
})
export class BasketPageCenterComponent implements OnInit {
  private backendUrl = 'https://project13b-backend-fluffy-kittens.onrender.com';
  cartItems: any[] = [];
  isLoading = true;
  cartProductIds: Set<string> = new Set();

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('Component initialized.');

    this.auth.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            console.log('Authenticated user:', user);
            const customerId = user.sub;
            console.log(`Fetching cart for customer ID: ${customerId}`);
            return this.http.get<{ customerId: string; productIds: string[] }>(
              `${this.backendUrl}/cart/${customerId}`
            );
          } else {
            console.error('User not authenticated');
            return of(null); 
          }
        }),
        switchMap((cart) => {
          if (cart && cart.productIds.length > 0) {
            console.log('Product IDs received:', cart.productIds);

            const productRequests = cart.productIds.map((id) =>
              this.http.get<any>(`${this.backendUrl}/products/${id}`)
            );

            return forkJoin(productRequests);
          } else {
            console.log('No cart products found.');
            return of([]); 
          }
        }),
        catchError((error) => {
          console.error('Error fetching products:', error);
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe((data) => {
        console.log('Products data received:', data);
        // Initialize quantity to 1 for each product (or based on your logic)
        this.cartItems = data.map(item => ({
          ...item,
          quantity: 1 // Default quantity can be set here
        }));
        this.isLoading = false;
      });
  }

  changeQuantity(productId: number, action: 'increase' | 'decrease'): void {
    const product = this.cartItems.find(p => p.id === productId);
    if (product) {
      if (action === 'increase' && product.quantity < product.stock) {
        product.quantity++;
      } else if (action === 'decrease' && product.quantity > 1) {
        product.quantity--;
      }
    }
  }

  removeFromCart(productId: string): void {
    this.auth.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            const customerId = user.sub;
            const url = `${this.backendUrl}/cart/${customerId}/products/${productId}`;
            return this.http.delete(url); 
          } else {
            return of(null); 
          }
        })
      )
      .subscribe(
        () => {
          this.toastr.success('Product removed from cart', 'Success');
          this.cartItems = this.cartItems.filter(product => product.id !== productId); 
        },
        (error) => {
          console.error('Error removing product:', error);
          this.toastr.error('Failed to remove product from cart', 'Error');
        }
      );
  }

  placeOrder(): void {
    console.log('Начинаем процесс размещения заказа...');
    
    this.auth.user$
      .pipe(
        tap(user => {
          if (user) {
            console.log('Пользователь авторизован:', user.sub);
          } else {
            console.warn('Пользователь не авторизован!');
          }
        }),
        switchMap((user) => {
          if (user) {
            const customerId = user.sub;
            const orderId = crypto.randomUUID();
            
            const orderData = {
              id: orderId,
              customerId: customerId,
              total: this.calculateTotal(),
              status: 'pending'
            };

            console.log('Подготовленные данные заказа:', orderData);
            console.log('Товары в корзине:', this.cartItems);

            const dialogRef = this.dialog.open(OrderDialogComponent, {
              width: '400px',
              data: { customerId, orderData }
            });

            return dialogRef.afterClosed().pipe(
              tap(result => {
                console.log('Результат закрытия диалога:', result);
              }),
              switchMap(result => {
                if (result && result.success) {
                  console.log('Отправляем запрос на создание заказа...');
                  return this.http.post(`${this.backendUrl}/orders`, orderData).pipe(
                    tap(() => console.log('Заказ успешно создан')),
                    catchError(error => {
                      console.error('Ошибка при создании заказа:', error);
                      console.error('Тело ответа:', error.error);
                      console.error('Статус:', error.status);
                      return throwError(error);
                    }),
                    switchMap(() => {
                      console.log('Добавляем продукты к заказу...');
                      const productPromises = this.cartItems.map(item => {
                        console.log(`Добавляем продукт ${item.id} к заказу ${orderId}`);
                        return this.http.post(`${this.backendUrl}/orders/${orderId}/products/${item.id}`, {}).pipe(
                          tap(() => console.log(`Продукт ${item.id} успешно добавлен`)),
                          catchError(error => {
                            console.error(`Ошибка при добавлении продукта ${item.id}:`, error);
                            console.error('Тело ответа:', error.error);
                            console.error('Статус:', error.status);
                            return throwError(error);
                          })
                        );
                      });
                      return forkJoin(productPromises);
                    })
                  );
                }
                console.log('Диалог был закрыт без подтверждения');
                return of(null);
              })
            );
          }
          console.warn('Возврат null из-за отсутствия пользователя');
          return of(null);
        })
      )
      .subscribe(
        (result) => {
          if (result) {
            console.log('Заказ успешно размещен:', result);
            this.toastr.success('Ваш заказ успешно размещен!', 'Успех');
            this.cartItems = [];
          } else {
            console.log('Заказ не был размещен (результат null)');
            this.toastr.info('Заказ не был размещен', 'Отменено');
          }
        },
        (error) => {
          console.error('Критическая ошибка при размещении з��каза:', error);
          this.toastr.error('Не удалось разместить заказ', 'Ошибка');
        }
      );
  }

  calculateTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.price;
    });
    return total;
  }
}  
