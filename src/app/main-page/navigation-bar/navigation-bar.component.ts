import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navigation-bar',
  standalone: false,
  
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  ngOnInit() {

    this.auth.user$.subscribe(user => {
      this.userPicture = user?.picture ?? '';
    });
  }

  isMenuOpen: boolean = false;

  userPicture: string = '';

  login() {
    if (!this.auth.isAuthenticated$) {
      this.auth.loginWithRedirect();
      console.log(this.userPicture);
      return;
    }
    this.logout();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
