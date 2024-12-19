import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Perfil } from '../model/Perfil';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${API_CONFIG.baseUrl}/perfis`);
  }

  findById(id: any): Observable<Perfil> {
    return this.http.get<Perfil>(`${API_CONFIG.baseUrl}/perfis/${id}`);
  }

  create(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(`${API_CONFIG.baseUrl}/perfis`, perfil);
  }

  update(perfil: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(`${API_CONFIG.baseUrl}/perfis/${perfil.id}`, perfil);
  }

  delete(id: any): Observable<Perfil> {
    return this.http.delete<Perfil>(`${API_CONFIG.baseUrl}/perfis/${id}`);
  }
}