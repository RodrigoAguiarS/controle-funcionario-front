import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoEntrada } from 'src/app/model/TipoEntrada';
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
  tiposEntrada: { label: string; value: string }[] = [];

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly pontoService: PontoService,
    private readonly usuarioService: UsuarioService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarUsuario();
    this.carregarTiposPonto();
  }

  private carregarUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.pontoForm.get('funcionario')?.setValue(usuario.funcionario.id);
      },
      error: (error) => {
        this.mensagensService.erro(error.error.message);
      },
    });
  }

  private carregarTiposPonto(): void {
    this.tiposEntrada = Object.keys(TipoEntrada).map((key) => ({
      label: key.charAt(0) + key.slice(1).toLowerCase(),
      value: key,
    }));
  }

  create(): void {
    this.pontoService.registrarPonto(this.pontoForm.value).subscribe({
      next: () => {
        this.mensagensService.sucesso('Ponto Inserido com sucesso');
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

  iniciarForm(): void {
    this.pontoForm = this.formBuilder.group({
      tipo: [null, [Validators.required]],
      dataHora: [null, [Validators.required]],
      funcionario: [null, Validators.required],
      observacao: [''],
    });
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}
