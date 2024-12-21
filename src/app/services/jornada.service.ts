import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor(private readonly http: HttpClient) { }

  getResumoJornada(funcionarioId: number, data: string): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/jornadas/resumo/${funcionarioId}?data=${data}`);
  }
}
