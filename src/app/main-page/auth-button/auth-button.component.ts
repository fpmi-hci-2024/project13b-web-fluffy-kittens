import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT, CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
  @Input() iconClass: string = '';
}
