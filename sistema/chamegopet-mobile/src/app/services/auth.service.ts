import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStatus = new BehaviorSubject<boolean>(false);
  private token: string | null = null; // Variável token
  public initPromise: Promise<void>;

  constructor(private storage: Storage) {
    this.initPromise = this.initializeStorage();
  }

  private async initializeStorage() {
    try {
      await this.storage.create();
      const token = await this.storage.get('token');
      console.log('Token carregado:', token);
      if (token) {
        this.token = token;
        this._authStatus.next(true);
      } else {
        this._authStatus.next(false);
      }
    } catch (error) {
      console.error('Erro ao inicializar o armazenamento:', error);
      this._authStatus.next(false);
    }
  }

  public async login(token: string): Promise<boolean> {
    console.log('Armazenando token no Storage:', token); // Adicione esse log para verificar
    await this.storage.set('token', token);
    this.token = token;
    this._authStatus.next(true);
    return true;
  }
  

  public async logout() {
    await this.storage.remove('token');
    console.log('Token removido do Storage'); // Log para depuração
    this._authStatus.next(false);
    this.token = null; // Limpa o token após o logout
  }

  // Método assíncrono para verificar se o usuário está logado
  public async isLoggedIn(): Promise<boolean> {
    // Espera até o armazenamento ser inicializado
    await this.initPromise;
    return this._authStatus.getValue();
  }

  public get authStatus(): Observable<boolean> {
    return this._authStatus.asObservable();
  }

  // Método para obter o token do Storage
  async getToken(): Promise<string | null> {
    await this.initPromise; // Espera pela inicialização do armazenamento
    return this.token;
  }
}
