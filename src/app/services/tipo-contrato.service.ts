import { Injectable } from '@angular/core';
import { TipoContrato } from '../model/TipoContrato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TipoContratoService {

    constructor(private readonly http: HttpClient) { }

    findAll(): Observable<TipoContrato[]> {
      return this.http.get<TipoContrato[]>(`${API_CONFIG.baseUrl}/tiposContrato`);
    }

    findById(id: any): Observable<TipoContrato> {
      return this.http.get<TipoContrato>(`${API_CONFIG.baseUrl}/tiposContrato/${id}`);
    }

    create(tipoContrato: TipoContrato): Observable<TipoContrato> {
      return this.http.post<TipoContrato>(`${API_CONFIG.baseUrl}/tiposContrato`, tipoContrato);
    }

    update(tipoContrato: TipoContrato): Observable<TipoContrato> {
      return this.http.put<TipoContrato>(`${API_CONFIG.baseUrl}/tiposContrato/${tipoContrato.id}`, tipoContrato);
    }

    delete(id: any): Observable<TipoContrato> {
      return this.http.delete<TipoContrato>(`${API_CONFIG.baseUrl}/tiposContrato/${id}`);
    }
  }
