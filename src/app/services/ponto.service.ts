import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Ponto } from '../model/Ponto';

@Injectable({
  providedIn: 'root',
})
export class PontoService {
  constructor(private readonly http: HttpClient) {}

  registrarPonto(ponto: Ponto): Observable<Ponto> {
    return this.http.post<Ponto>(`${API_CONFIG.baseUrl}/pontos`, ponto);
  }

  obterUltimoPonto(funcionarioId: number): Observable<any> {
    return this.http.get<any>(
      `${API_CONFIG.baseUrl}/pontos/ultimoTipoPonto/${funcionarioId}`
    );
  }

  salvarPonto(funcionarioId: number, ponto: any): Observable<void> {
    return this.http.post<void>(
      `${API_CONFIG.baseUrl}/pontos/salvar?funcionarioId=${funcionarioId}`,
      ponto
    );
  }

  findById(id: any): Observable<Ponto> {
    return this.http.get<Ponto>(`${API_CONFIG.baseUrl}/pontos/${id}`);
  }

  editarPonto(id: number, ponto: Ponto): Observable<Ponto> {
    return this.http.put<Ponto>(
      `${API_CONFIG.baseUrl}/pontos/editar/${id}`,
      ponto
    );
  }

  delete(id: any): Observable<Ponto> {
    return this.http.delete<Ponto>(`${API_CONFIG.baseUrl}/pontos/${id}`);
  }
}
