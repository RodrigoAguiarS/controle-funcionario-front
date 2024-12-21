import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PontoService } from 'src/app/services/ponto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ponto-insert',
  templateUrl: './ponto-insert.component.html',
  styleUrls: ['./ponto-insert.component.css'],
})
export class PontoInsertComponent implements OnInit {
  pontoForm!: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly pontoService: PontoService,
    private readonly usuarioService: UsuarioService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.carregarUsuario();
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

  create(): void {
    this.pontoService.registrarPonto(this.usuario.funcionario.id).subscribe({
      next: (resposta) => {
        this.mensagensService.sucesso('Ponto Cadastrado com sucesso');
        this.router.navigate(['/home']);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: ErrorEvent) => {
            this.mensagensService.erro(element.message);
          });
        } else {
          this.mensagensService.erro(ex.error.message);
        }
      },
    });
  }

  initForm(): void {
    this.pontoForm = this.formBuilder.group({
      tipo: [null, [Validators.required]],
      novaDataHora: [null, [Validators.required]],
    });
  }
}
