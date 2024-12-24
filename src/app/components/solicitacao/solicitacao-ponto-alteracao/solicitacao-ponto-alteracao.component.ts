import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ponto } from 'src/app/model/Ponto';
import { TipoEntrada } from 'src/app/model/TipoEntrada';
import { Usuario } from 'src/app/model/Usuario';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PontoService } from 'src/app/services/ponto.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitacao-ponto-alteracao',
  templateUrl: './solicitacao-ponto-alteracao.component.html',
  styleUrls: ['./solicitacao-ponto-alteracao.component.css']
})
export class SolicitacaoPontoAlteracaoComponent implements OnInit {

  solicitacaoForm!: FormGroup;
    tiposEntrada: { label: string; value: string }[] = [];
    id!: number;
    ponto!: Ponto;

    constructor(
      private readonly mensagensService: MensagensService,
      private readonly solicitacaoService: SolicitacaoService,
      private readonly usuarioService: UsuarioService,
      private readonly pontoService: PontoService,
      private readonly formBuilder: FormBuilder,
      private readonly router: Router,
      private readonly route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.carregarTiposPonto();
      this.carregarUsuario();
      this.initForm();
      this.carregarPonto();
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

    carregarPonto(): void {
      this.pontoService.findById(this.id).subscribe({
        next: (ponto) => {
          console.log(ponto);
          this.solicitacaoForm.get('dataHoraOriginal')?.setValue(ponto.dataHora);
          this.solicitacaoForm.get('tipo')?.setValue(ponto.tipo);
        },
        error: (error) => {
          this.mensagensService.erro(
            'Erro ao carregar ponto: ' + error.error.message
          );
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
        tipo: [null, [Validators.required]],
        dataHoraOriginal: ['', Validators.required],
        dataHoraCorrigida: ['', Validators.required],
        motivo: ['', Validators.required],
      });
    }
  }
