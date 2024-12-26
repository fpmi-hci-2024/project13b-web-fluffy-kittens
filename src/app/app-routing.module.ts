import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageCenterComponent } from './main-page/main-page-center/main-page-center.component';
import { CatalogPageCenterComponent } from './catalog-page/catalog-page-center/catalog-page-center.component';
import { AboutUsPageCenterComponent } from './about-us-page/about-us-page-center/about-us-page-center.component';
import { ContactsPageCenterComponent } from './contacts-page/contacts-page-center/contacts-page-center.component';
import { FavoritesCenterComponent } from './favorites-page/favorites-center/favorites-center.component';
import { BasketPageCenterComponent } from './basket-page/basket-page-center/basket-page-center.component';

const routes: Routes = [
  { path: '', component: MainPageCenterComponent}, 
  { path: 'catalog', component: CatalogPageCenterComponent},
  { path: 'about-us', component: AboutUsPageCenterComponent},
  { path: 'contacts', component: ContactsPageCenterComponent},
  { path: 'favorites', component: FavoritesCenterComponent},
  { path: 'cart', component: BasketPageCenterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
