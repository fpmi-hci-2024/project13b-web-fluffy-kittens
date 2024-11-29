import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './main-page/main-page.module';
import { CatalogPageModule } from './catalog-page/catalog-page.module';
import { MainPageCenterComponent } from './main-page/main-page-center/main-page-center.component';
import { AboutUsPageModule } from './about-us-page/about-us-page.module';
import { ContactsPageModule } from './contacts-page/contacts-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    CatalogPageModule,
    AboutUsPageModule,
    ContactsPageModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
