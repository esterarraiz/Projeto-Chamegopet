import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CepResponse {
  localidade: string;
  uf: string;
}

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  getEnderecoPorCep(cep: string): Observable<CepResponse> {
    const url = `https://viacep.com.br/ws/${cep}/json/`; // Endpoint da API ViaCEP
    console.log('Consultando CEP: ', url); // Log da URL para depuração
    return this.http.get<CepResponse>(url);
  }
}
