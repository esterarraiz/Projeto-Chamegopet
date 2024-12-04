import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-popover',
  template: `
    <ion-list>
      <ion-item button (click)="goToMyAds()">Minhas divulgações</ion-item>
      <ion-item button (click)="logout()">Sair</ion-item>
    </ion-list>
  `,
  standalone: true,
  imports: [IonicModule],
})
export class PopoverComponent {

  constructor(
    private popoverController: PopoverController,
    private router: Router,
    private authService: AuthService,
  ) {}

  // Navega para a página de "Minhas divulgações"
  goToMyAds() {
    console.log('Redirecionando para Minhas Divulgações');
    this.router.navigate(['/minhas-divulgacoes']);
    this.popoverController.dismiss(); // Fecha o popover
  }
  

  // Realiza o logout
  async logout() {
    // Realiza o logout
    await this.authService.logout();
    // Fecha o popover após o logout
    await this.popoverController.dismiss();
  }
}
