import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// for debugging purposes
import { enableDebugTools } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(module => {
  const aplicationRef = module.injector.get(ApplicationRef);
  const appComponent = aplicationRef.components[0];
  enableDebugTools(appComponent);
})
  .catch(err => console.log(err));
