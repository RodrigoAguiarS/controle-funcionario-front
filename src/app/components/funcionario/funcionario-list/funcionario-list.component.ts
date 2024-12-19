import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioResposta } from 'src/app/model/UsuarioResposta';
import { MensagensService } from 'src/app/services/mensagens.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {

  usuarios: UsuarioResposta[] = [];
  loading: boolean = true;

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly mensagensService: MensagensService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.findAllUsuarios();
  }

  findAllUsuarios() {
    this.usuarioService.findAll().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.loading = false;
      },
      error: (e) => this.mensagensService.erro(e),
      complete: () => {},
    });
  }

  entrarCadastro() {
    this.router.navigate(['funcionarios/create']);
  }
}
