import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../home/pets.models';
import { lastValueFrom } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-minhas-divulgacoes',
  templateUrl: './minhas-divulgacoes.page.html',
  styleUrls: ['./minhas-divulgacoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [HttpClient, ApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class MinhasDivulgacoesPage implements OnInit {
  pets: any[] = []; // Inicializa como lista vazia
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private http: HttpClient,
    private authService: AuthService // Injetar AuthService
  ) {}

  ngOnInit() {
    this.carregarPets();
  }

  async carregarPets() {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      const token = await this.authService.getToken(); 
      console.log('Token:', token); 
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Token ${token}`); 
        this.http
          .get('http://127.0.0.1:8000/pets/api/minhas-divulgacoes/', { headers }) 
          .subscribe(
            (response: any) => {
              console.log('Pets carregados:', response);
              this.pets = response.results.map((pet: any) => {
                if (pet.imagem && !pet.imagem.startsWith('http')) {
                  pet.imagem = `http://127.0.0.1:8000${pet.imagem}`;
                }
                return pet;
              }); 
              this.isLoading = false; 
            },
            (error) => {
              console.error('Erro ao carregar pets:', error);
              this.pets = []; 
              this.isLoading = false; 
            }
          );
      } else {
        console.log('Token não encontrado');
        this.navCtrl.navigateForward('/login'); 
      }
    } else {
      console.log('Usuário não autenticado');
      this.navCtrl.navigateForward('/login'); 
    }
  }

  editarDivulgacao(petId: number) {
    this.navCtrl.navigateForward(`/editar-divulgacao/${petId}`);
  }

  async excluirDivulgacao(petId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza de que deseja excluir este pet?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada');
          },
        },
        {
          text: 'Excluir',
          handler: async () => {
            console.log('Excluir pet com ID:', petId);
            
            try {
              await lastValueFrom(this.apiService.excluirPet(petId)); 
              console.log('Pet excluído com sucesso!');
              this.carregarPets(); 
            } catch (error) {
              console.error('Erro ao excluir pet:', error);
              this.exibirMensagemErro('Erro ao excluir o pet. Tente novamente.');
            }
          },
        },
      ],
    });
  
    await alert.present(); 
  }
  
  async exibirMensagemErro(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: mensagem,
      buttons: ['OK'],
    });
    await alert.present();
  }  
  
}
