import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { forkJoin, of, switchMap, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites-center',
  templateUrl: './favorites-center.component.html',
  styleUrls: ['./favorites-center.component.css'],
  standalone: false,
})
export class FavoritesCenterComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  private backendUrl = 'https://project13b-backend-fluffy-kittens.onrender.com';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('Component initialized.');

    this.auth.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            console.log('Authenticated user:', user);
            const customerId = user.sub;
            console.log(`Fetching favorites for customer ID: ${customerId}`);
            return this.http.get<{ customerId: string; productIds: string[] }>(
              `${this.backendUrl}/favorites/${customerId}`
            );
          } else {
            console.error('User not authenticated');
            return of(null); // No user, no favorites
          }
        }),
        switchMap((favorites) => {
          if (favorites && favorites.productIds.length > 0) {
            console.log('Product IDs received:', favorites.productIds);

            // Create an array of HTTP requests to fetch each product
            const productRequests = favorites.productIds.map((id) =>
              this.http.get<any>(`${this.backendUrl}/products/${id}`)
            );

            // Use forkJoin to fetch all products in parallel
            return forkJoin(productRequests);
          } else {
            console.log('No favorite products found.');
            return of([]); // No products to fetch
          }
        }),
        catchError((error) => {
          console.error('Error fetching products:', error);
          this.isLoading = false;
          return of([]); // Return an empty array on error to avoid breaking the app
        })
      )
      .subscribe((data) => {
        console.log('Products data received:', data);
        this.products = data;
        this.isLoading = false;
      });
  }

  removeFromFavorites(productId: string): void {
    this.auth.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            const customerId = user.sub;
            const url = `${this.backendUrl}/favorites/${customerId}/products/${productId}`;
            return this.http.delete(url);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        () => {
          this.toastr.success('Product removed from favorites', 'Success');
          this.products = this.products.filter(product => product.id !== productId);
        },
        (error) => {
          console.error('Error removing product:', error);
          this.toastr.error('Failed to remove product from favorites', 'Error');
        }
      );
  }
}
