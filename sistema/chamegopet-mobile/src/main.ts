import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot({})), // Configuração do Ionic
    importProvidersFrom(IonicStorageModule.forRoot()), // Configuração do Storage
    provideRouter(routes), // Configuração das rotas
    
  ],
}).catch(err => console.error(err));
