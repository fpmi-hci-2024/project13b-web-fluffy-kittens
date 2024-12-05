import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page-button',
  standalone: false,
  
  templateUrl: './main-page-button.component.html',
  styleUrl: './main-page-button.component.css'
})
export class MainPageButtonComponent {
  @Input() routerLink: string | undefined;

  constructor(private router: Router) {}

  navigate() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }

}
