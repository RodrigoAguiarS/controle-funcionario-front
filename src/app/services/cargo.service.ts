import { Injectable } from '@angular/core';
import { Cargo } from '../model/Cargo';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

   constructor(private readonly http: HttpClient) { }

    findAll(): Observable<Cargo[]> {
      return this.http.get<Cargo[]>(`${API_CONFIG.baseUrl}/cargos`);
    }

    findById(id: any): Observable<Cargo> {
      return this.http.get<Cargo>(`${API_CONFIG.baseUrl}/cargos/${id}`);
    }

    create(perfil: Cargo): Observable<Cargo> {
      return this.http.post<Cargo>(`${API_CONFIG.baseUrl}/cargos`, perfil);
    }

    update(perfil: Cargo): Observable<Cargo> {
      return this.http.put<Cargo>(`${API_CONFIG.baseUrl}/cargos/${perfil.id}`, perfil);
    }

    delete(id: any): Observable<Cargo> {
      return this.http.delete<Cargo>(`${API_CONFIG.baseUrl}/cargos/${id}`);
    }
  }
