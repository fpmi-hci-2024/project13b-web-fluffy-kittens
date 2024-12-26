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
    console.log('Starting order placement process...');
    
    this.auth.user$
      .pipe(
        tap(user => {
          if (user) {
            console.log('User authenticated:', user.sub);
          } else {
            console.warn('User not authenticated!');
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

            console.log('Prepared order data:', orderData);
            console.log('Cart items:', this.cartItems);

            const dialogRef = this.dialog.open(OrderDialogComponent, {
              width: '400px',
              data: { customerId, orderData }
            });

            return dialogRef.afterClosed().pipe(
              tap(result => {
                console.log('Dialog close result:', result);
              }),
              switchMap(result => {
                if (result && result.success) {
                  console.log('Sending order creation request...');
                  return this.http.post(`${this.backendUrl}/orders`, orderData).pipe(
                    tap(() => console.log('Order created successfully')),
                    catchError(error => {
                      console.error('Error creating order:', error);
                      console.error('Response body:', error.error);
                      console.error('Status:', error.status);
                      return throwError(error);
                    }),
                    switchMap(() => {
                      console.log('Adding products to order...');
                      const productPromises = this.cartItems.map(item => {
                        console.log(`Adding product ${item.id} to order ${orderId}`);
                        return this.http.post(`${this.backendUrl}/orders/${orderId}/products/${item.id}`, {}).pipe(
                          tap(() => console.log(`Product ${item.id} added successfully`)),
                          catchError(error => {
                            console.error(`Error adding product ${item.id}:`, error);
                            console.error('Response body:', error.error);
                            console.error('Status:', error.status);
                            return throwError(error);
                          })
                        );
                      });
                      return forkJoin(productPromises);
                    })
                  );
                }
                console.log('Dialog was closed without confirmation');
                return of(null);
              })
            );
          }
          console.warn('Returning null due to missing user');
          return of(null);
        })
      )
      .subscribe(
        (result) => {
          if (result) {
            console.log('Order placed successfully:', result);
            this.toastr.success('Your order has been placed successfully!', 'Success');
            this.cartItems = [];
          } else {
            console.log('Order was not placed (null result)');
            this.toastr.info('Order was not placed', 'Cancelled');
          }
        },
        (error) => {
          console.error('Critical error while placing order:', error);
          this.toastr.error('Failed to place order', 'Error');
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
