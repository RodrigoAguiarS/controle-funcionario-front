import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoEntrada } from 'src/app/model/TipoEntrada';
import { Usuario } from 'src/app/model/Usuario';
import { MensagensService } from 'src/app/services/mensagens.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitacao-ponto-create',
  templateUrl: './solicitacao-ponto-create.component.html',
  styleUrls: ['./solicitacao-ponto-create.component.css'],
})
export class SolicitacaoPontoCreateComponent implements OnInit {
  solicitacaoForm!: FormGroup;
  tiposEntrada: { label: string; value: string }[] = [];

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly solicitacaoService: SolicitacaoService,
    private readonly usuarioService: UsuarioService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.carregarTiposPonto();
    this.carregarUsuario();
    this.initForm();
  }

  create(): void {
    this.solicitacaoService.create(this.solicitacaoForm.value).subscribe({
      next: (resposta) => {
        this.mensagensService.sucesso('Solicitação cadastrado com sucesso');
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

  private carregarUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.solicitacaoForm
          .get('funcionario')
          ?.setValue(usuario.funcionario.id);
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

  initForm(): void {
    this.solicitacaoForm = this.formBuilder.group({
      funcionario: ['', Validators.required],
      dataHoraOriginal: ['', Validators.required],
      dataHoraCorrigida: ['', Validators.required],
      tipo: ['', Validators.required],
      motivo: ['', Validators.required],
    });
    this.solicitacaoForm
      .get('dataHoraCorrigida')
      ?.valueChanges.subscribe((value) => {
        this.solicitacaoForm.get('dataHoraOriginal')?.setValue(value);
      });
  }
}
