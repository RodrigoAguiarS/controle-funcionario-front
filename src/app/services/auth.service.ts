import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../model/Credenciais';
import { Observable, tap } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private readonly http: HttpClient) {}

  /*
   * Método que realiza a autenticação do usuário
   */
  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: 'response',
      responseType: 'text',
    });
  }

  /*
   * Método que armazena o token no localStorage
   */
  successfulLogin(token: string) {
    localStorage.setItem('token', token);
  }

  /*
   * Método que verifica se o usuário está autenticado
   */
  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      let isExpired = this.jwtService.isTokenExpired(token);
      return !isExpired;
    }
    return false;
  }

  /*
   * Método que realiza o logout do usuário
   */
  logout() {
    localStorage.clear();
  }

  /**
   *
   * @returns Retorna os papéis do usuário
   */
  getUserRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${API_CONFIG.baseUrl}/usuarios/papel`);
  }

  /**
   * @param email Email do usuário que será logado
   * @returns Retorna o token do usuário logado
   */
  logarComoUsuario(email: string): Observable<string> {
    // Salvar o token original antes de iniciar o impersonate
    const tokenOriginal = localStorage.getItem('token');
    if (tokenOriginal) {
      localStorage.setItem('tokenOriginal', tokenOriginal);
    }

    return this.http.post(`${API_CONFIG.baseUrl}/api/impersonate/logarComo`, { email }, { responseType: 'text' }).pipe(
      tap((token: string) => {
        localStorage.setItem('impersonateToken', token);
        localStorage.setItem('token', token);
      })
    );
  }

  /** Voltar ao usuário anterior */
  voltarAoUsuarioAnterior(): Observable<string> {
    return this.http.post(`${API_CONFIG.baseUrl}/api/impersonate/voltarAoUsuarioLogado`, {}, { responseType: 'text' }).pipe(
      tap(() => {
        const tokenOriginal = localStorage.getItem('tokenOriginal');
        if (tokenOriginal) {
          localStorage.setItem('token', tokenOriginal);
          localStorage.removeItem('tokenOriginal');
        }
        localStorage.removeItem('impersonateToken');
      })
    );
  }
}
