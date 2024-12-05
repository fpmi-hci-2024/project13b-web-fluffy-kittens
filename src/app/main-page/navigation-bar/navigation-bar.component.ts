import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navigation-bar',
  standalone: false,
  
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  constructor(public auth: AuthService) {}
  isAuthenticated = false;

  toggleAuthentication() {
    this.isAuthenticated = !this.isAuthenticated;
  }
}
