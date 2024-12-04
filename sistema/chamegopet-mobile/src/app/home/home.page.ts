import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Pet } from './pets.models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PopoverComponent } from './popover.component';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, CommonModule, RouterModule],
  providers: [HttpClient],
})
export class HomePage implements OnInit {
  public pets: Pet[] = []; // Lista de pets carregados
  public isLoading = false;
  public isAuthenticated: boolean = false; 

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    private popoverController: PopoverController,
  ) {}

  ngOnInit() {
    this.authService.initPromise.then(() => {
      this.authService.authStatus.subscribe((status: boolean) => {
        console.log('Estado do BehaviorSubject atualizado no subscribe:', status);
        this.isAuthenticated = status;
      });
  
      console.log('Estado inicial do BehaviorSubject:', this.authService.isLoggedIn());
      this.carregarPets(); 
    }).catch(error => {
      console.error('Erro na inicialização do Storage:', error);
    });
  }  
  
  async openProfileMenu(event: MouseEvent) {
    const popover = await this.popoverController.create({
      component: PopoverComponent, 
      event: event,               
      translucent: true,          
    });
  
    await popover.present(); 
  }

  goToDetails(id: number) {
    console.log('goToDetails chamado, estado de autenticação:', this.isAuthenticated);
    if (this.isAuthenticated) {
      console.log('Usuário logado, navegando para detalhes...');
      this.router.navigate(['/detalhes', id]);
    } else {
      console.log('Usuário não autenticado, redirecionando para login...');
      this.router.navigate(['/autenticacao']);
    }
  }
  
  
  async carregarPets() {
    this.isLoading = true;
    try {
      // Requisição sem cabeçalho de autenticação
      const response: any = await lastValueFrom(
        this.http.get('http://127.0.0.1:8000/pets/api/pets/')
      );
      this.pets = response.results.map((pet: any) => ({
        ...pet,
        imagem: pet.imagem ? `http://127.0.0.1:8000${pet.imagem}` : null,
      }));
    } catch (error) {
      console.error('Erro ao carregar os pets:', error);
      this.mostrarMensagem('Erro ao carregar os pets. Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }
  async mostrarMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000, 
      position: 'bottom', 
    });
    toast.present();
  }
  
  

  goToLogin() {
  console.log('Redirecionando para a página de login.');
  this.router.navigate(['/autenticacao']);
}
  gotoDivulgar(){
    console.log('Redirecionando para a página de divulgação.');
    this.router.navigate(['/divulgar-pet']);
  }
  
}

