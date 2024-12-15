import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-catalog-page-center",
  templateUrl: "./catalog-page-center.component.html",
  styleUrls: ["./catalog-page-center.component.css"],
  standalone: false,
})
export class CatalogPageCenterComponent implements OnInit {
  products: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>(
        "https://project13b-backend-fluffy-kittens.onrender.com/products/",
      )
      .subscribe({
        next: (data) => {
          this.products = Object.values(data); // Преобразуем объект в массив
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Ошибка при загрузке данных:", err);
          this.isLoading = false;
        },
      });
  }
}
