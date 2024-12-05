import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog-page-center',
  standalone: false,
  
  templateUrl: './catalog-page-center.component.html',
  styleUrl: './catalog-page-center.component.css'
})
export class CatalogPageCenterComponent {
  products = Array(10).fill({
    name: 'Sample Product',
    description: 'This is a placeholder description for the product.'
  });
}
