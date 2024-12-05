import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-page-icon',
  standalone: false,
  
  templateUrl: './main-page-icon.component.html',
  styleUrl: './main-page-icon.component.css'
})
export class MainPageIconComponent {
  @Input() iconClass: string = '';
}
