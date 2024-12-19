import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/Usuario';
import { Pessoa } from 'src/app/model/Pessoa';
import { Component, OnInit } from '@angular/core';
import { MensagensService } from 'src/app/services/mensagens.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario = new Usuario();
  papel: string[] = [];

  constructor(private readonly authService: AuthService,
    private readonly mensagensService: MensagensService,
    private readonly usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarPapelUsuario();
  }

  private carregarPapelUsuario(): void {
    this.authService.getUserRoles().subscribe({
      next: (roles: string[]) => {
        this.papel = roles;
      },
      error: (error) => {
        this.mensagensService.erro(error.error.message);
      },
    });
  }

  private carregarUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        this.mensagensService.erro(error.error.message);
      },
    });
  }
}
