import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { DetailsComponent } from "../../product-details/details/details.component";

@Component({
  selector: "app-catalog-page-center",
  templateUrl: "./catalog-page-center.component.html",
  styleUrls: ["./catalog-page-center.component.css"],
  standalone: false
})
export class CatalogPageCenterComponent implements OnInit {
  products: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient, private dialog: MatDialog) {}
  private backendUrl = 'https://project13b-backend-fluffy-kittens.onrender.com';
  ngOnInit() {
    this.http
      .get<any>(this.backendUrl + "/products")
      .subscribe({
        next: (data) => {
          this.products = Object.values(data);
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Ошибка при загрузке данных:", err);
          this.isLoading = false;
        },
      });
  }


  openDetails(product: any): void {
    this.dialog.open(DetailsComponent, {
      width: '400px',
      data: product,
    });
  }
}
