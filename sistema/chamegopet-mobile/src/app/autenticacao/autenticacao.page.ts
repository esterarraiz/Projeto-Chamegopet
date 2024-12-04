import { Usuario } from './usuario.models';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service'; // Adicionar o AuthService

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.page.html',
  styleUrls: ['./autenticacao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule], 
  providers: [HttpClient, Storage, AuthService] 
})
export class AutenticacaoPage {
  public instancia: { username: string, password: string } = {
    username: '',
    password: ''
  };

  public mensagem: string = '';

  constructor(
    private storage: Storage,
    public controle_carregamento: LoadingController,
    public controle_navegacao: NavController,
    public controle_alerta: AlertController,
    public controle_toast: ToastController,
    public http: HttpClient,
    private authService: AuthService 
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  async autenticarUsuario() {
    const loading = await this.controle_carregamento.create({ message: 'Autenticando...', duration: 15000 });
    await loading.present();
  
    const http_headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http.post(
      'http://127.0.0.1:8000/api/login/', 
      this.instancia,
      { headers: http_headers }
    ).subscribe({
      next: async (resposta: any) => {
        if (resposta && resposta.token) { 
          let usuario: Usuario = Object.assign(new Usuario(), resposta);
          await this.storage.set('usuario', usuario);
          await this.storage.set('token', resposta.token); 

          this.authService.login(resposta.token); 

          loading.dismiss();
          this.controle_navegacao.navigateRoot('/');
        } else {
          loading.dismiss();
          const mensagem = await this.controle_toast.create({
            message: 'Login inválido. Verifique as credenciais.',
            cssClass: 'ion-text-center',
            duration: 2000
          });
          mensagem.present();
        }
      },
      error: async (erro: any) => {
        loading.dismiss();
        const mensagem = await this.controle_toast.create({
          message: `Falha ao autenticar usuário: ${erro.message}`,
          cssClass: 'ion-text-center',
          duration: 2000
        });
        mensagem.present();
      }
    });
  }
}
