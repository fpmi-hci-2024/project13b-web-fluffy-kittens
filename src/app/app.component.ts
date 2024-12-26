import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { of, switchMap, catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FluffyShopWeb';
  private backendUrl = 'https://project13b-backend-fluffy-kittens.onrender.com';
  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth.user$.subscribe((user) => {
          if (user) {
            const newCustomer = {
              id: user.sub,
              name: user.name || 'Default Name',
              email: user.email || 'no-email@example.com',
              phone: 'N/A',
            };

            // Создаем пользователя и после этого корзину и избранное
            this.http.post(`${this.backendUrl}/customers`, newCustomer)
              .pipe(
                catchError((error) => {
                  console.error('Ошибка при создании ресурсов:', error);
                  return of(null); // Возвращаем пустое значение для продолжения выполнения
                })
              )
              .subscribe(() => {
                console.log('Пользователь, корзина и избранное успешно созданы.');
              });
          }
        });
      }
    });
  }

  
  
}
