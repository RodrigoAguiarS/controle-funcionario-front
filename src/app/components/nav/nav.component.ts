import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariochangeService } from 'src/app/services/usuariochange.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isCollapsed = false;
  isMenu1Active = true;
  roles: string[] = [];
  usuario: Usuario = new Usuario();
  userChangeSubscription!: Subscription;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
    private readonly mensagemService: MensagensService,
    private readonly usuarioChange: UsuariochangeService
  ) {}

  ngOnInit(): void {
    this.subscribeToUserChanges();
    this.loadUserRoles();
    this.carregarUsuario();
  }

  ngOnDestroy(): void {
    if (this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }
  }

    toggleMenu() {
    this.isMenu1Active = !this.isMenu1Active;
  }

  private subscribeToUserChanges(): void {
    this.userChangeSubscription = this.usuarioChange.userChanged$
      .pipe(
        switchMap(() =>
          this.authService.getUserRoles().pipe(
            catchError((error) => {
              this.mensagemService.erro(error.error.message);
              return of([]);
            })
          )
        )
      )
      .subscribe((roles: string[]) => {
        this.roles = roles;
        this.carregarUsuario();
      });
  }

  private loadUserRoles(): void {
    this.authService.getUserRoles().subscribe({
      next: (roles: string[]) => {
        this.roles = roles;
      },
      error: (error) => {
        this.mensagemService.erro(error.error.message);
      },
    });
  }

  private carregarUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        this.mensagemService.erro(error.error.message);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
    this.mensagemService.informacao('Usuário deslogado com sucesso');
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
  }
}
