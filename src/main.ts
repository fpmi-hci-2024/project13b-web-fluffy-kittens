import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

bootstrapApplication(AppModule, {
  providers: [
    provideAuth0({
      domain: 'dev-03u3jiv05cfvetyf.us.auth0.com',
      clientId: 'XeUVaCS0GLA7DF9AhZd5MgwI7pJqDPcB',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
});