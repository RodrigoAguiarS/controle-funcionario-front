import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoResposta } from '../model/EnderecoResposta';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(private readonly http: HttpClient) {}

  buscaEnderecoPorCep(cep: string): Observable<EnderecoResposta> {
    return this.http.get<EnderecoResposta>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
  }
}