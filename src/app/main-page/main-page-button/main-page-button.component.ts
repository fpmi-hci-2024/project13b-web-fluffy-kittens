import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-page-button',
  standalone: false,
  
  templateUrl: './main-page-button.component.html',
  styleUrl: './main-page-button.component.css'
})
export class MainPageButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() route: string = '';

  onClick() {
    console.log(`${this.label} button clicked!`);
  }
}
