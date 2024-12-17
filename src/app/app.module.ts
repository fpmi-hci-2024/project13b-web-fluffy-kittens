import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './main-page/main-page.module';
import { CatalogPageModule } from './catalog-page/catalog-page.module';
import { MainPageCenterComponent } from './main-page/main-page-center/main-page-center.component';
import { AboutUsPageModule } from './about-us-page/about-us-page.module';
import { ContactsPageModule } from './contacts-page/contacts-page.module';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev-03u3jiv05cfvetyf.us.auth0.com',
      clientId: 'XeUVaCS0GLA7DF9AhZd5MgwI7pJqDPcB',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    AppRoutingModule,
    MainPageModule,
    CatalogPageModule,
    AboutUsPageModule,
    ContactsPageModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
