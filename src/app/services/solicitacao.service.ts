import { Injectable } from '@angular/core';
import { SolicitacaoPonto } from '../model/SolicitacaoPonto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { SolicitacaoPontoReposta } from '../model/SolicitacaoPontoReposta';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoService {
  constructor(private readonly http: HttpClient) {}

  create(solicitacaoPonto: SolicitacaoPonto): Observable<SolicitacaoPonto> {
    return this.http.post<SolicitacaoPonto>(
      `${API_CONFIG.baseUrl}/solicitacoes-correcao-ponto`,
      solicitacaoPonto
    );
  }

  aprovar(id: any): Observable<SolicitacaoPontoReposta> {
    return this.http.post<SolicitacaoPontoReposta>(
      `${API_CONFIG.baseUrl}/solicitacoes-correcao-ponto/aprovar/${id}`,
      null
    );
  }

  findAll(): Observable<SolicitacaoPontoReposta[]> {
    return this.http.get<SolicitacaoPontoReposta[]>(
      `${API_CONFIG.baseUrl}/solicitacoes-correcao-ponto`
    );
  }

  findById(id: any): Observable<SolicitacaoPontoReposta> {
    return this.http.get<SolicitacaoPontoReposta>(`${API_CONFIG.baseUrl}/solicitacoes-correcao-ponto/${id}`);
  }
}
