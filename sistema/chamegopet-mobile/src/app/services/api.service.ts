import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { firstValueFrom } from 'rxjs'; // Importando firstValueFrom

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/pets/api/minhas-divulgacoes/'; 
  private baseUrl = 'http://127.0.0.1:8000/pets/api/'; 

  constructor(private http: HttpClient) { }

  createPet(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}divulgar-pet/`; 
    return this.http.post(url, formData).pipe(
      catchError(error => {
        console.error('Erro ao criar pet:', error);
        return throwError(error); 
      })
    );
  }

  // Obter minhas divulgações
  getMinhasDivulgacoes(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));
    return this.http.get(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar minhas divulgações:', error);
        return throwError(error); 
      })
    );
  }

  // Excluir pet
  excluirPet(petId: number): Observable<any> {
    const url = `${this.baseUrl}excluir-divulgacao/${petId}/`; // Exemplo de URL para exclusão de pet
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));
    return this.http.delete(url, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao excluir pet:', error);
        return throwError(error); // Propaga o erro para ser tratado
      })
    );
  }
}