import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UsuarioResposta } from '../model/UsuarioResposta';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private readonly http: HttpClient) { }

  obterDadosUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/usuarios/dados`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_CONFIG.baseUrl}/usuarios`, usuario);
  }

  findAll(): Observable<UsuarioResposta[]> {
    return this.http.get<UsuarioResposta[]>(`${API_CONFIG.baseUrl}/usuarios`);
  }

  findById(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/usuarios/${id}`);
  }

  findByUsuarioPorId(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/usuarios/obterPorId/${id}`);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${API_CONFIG.baseUrl}/usuarios/${usuario.id}`, usuario);
  }

  delete(id: any): Observable<Usuario> {
    return this.http.delete<Usuario>(`${API_CONFIG.baseUrl}/usuarios/${id}`);
  }

  alterarSenha(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${API_CONFIG.baseUrl}/usuarios/alterar-senha/${usuario.id}`, usuario);
  }
}
