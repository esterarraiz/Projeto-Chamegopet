import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Pet } from '../home/pets.models';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.page.html',
  styleUrls: ['./pet-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule],
  providers: [HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class PetDetailPage implements OnInit {
  petDetail: Pet | null = null;
  isLoading = false;
  petId: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.petId = +id;
        this.loadPetDetails(this.petId);
      }
    });
  }

  async loadPetDetails(petId: number) {
    this.isLoading = true;
    try {
      console.log(`Carregando detalhes do pet com ID: ${petId}`);
      const token = await this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
        const response: any = await lastValueFrom(
          this.http.get(`http://127.0.0.1:8000/pets/api/pets/${petId}/`, { headers })
        );
        console.log('Detalhes do pet carregados:', response);
        if (response.imagem && !response.imagem.startsWith('http')) {
          response.imagem = `http://127.0.0.1:8000${response.imagem}`;
        }
        this.petDetail = response;
      } else {
        throw new Error('Token de autenticação não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao carregar os detalhes do pet:', error);
      const toast = await this.toastController.create({
        message: 'Erro ao carregar os detalhes do pet. Por favor, tente novamente mais tarde.',
        duration: 2000
      });
      toast.present();
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
