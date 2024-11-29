import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: false,
  
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  isAuthenticated = false;

  toggleAuthentication() {
    this.isAuthenticated = !this.isAuthenticated;
  }
}
