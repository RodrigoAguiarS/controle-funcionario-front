import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEntrada } from 'src/app/model/TipoEntrada';
import { MensagensService } from 'src/app/services/mensagens.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';

@Component({
  selector: 'app-solicitacao-aprovar',
  templateUrl: './solicitacao-aprovar.component.html',
  styleUrls: ['./solicitacao-aprovar.component.css'],
})
export class SolicitacaoAprovarComponent implements OnInit {
  solicitacaoForm!: FormGroup;
  id!: number;
  tiposEntrada: { label: string; value: string }[] = [];

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly solicitacaoService: SolicitacaoService,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initForm();
    this.loadSolicitacao();
    this.carregarTiposPonto();
  }

  loadSolicitacao(): void {
    this.solicitacaoService.findById(this.id).subscribe({
      next: (solicitacao) => {
        console.log(solicitacao);
        this.solicitacaoForm.patchValue(solicitacao);
      },

      error: (ex) => {
        this.mensagensService.erro(ex.error.message);
      },
    });
  }

  aprovar(): void {
    this.solicitacaoForm.value.id = this.id;
    this.solicitacaoService.aprovar(this.solicitacaoForm.value.id).subscribe({
      next: () => {
        this.mensagensService.sucesso('Solicitação aprovada com sucesso');
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

  private carregarTiposPonto(): void {
    this.tiposEntrada = Object.keys(TipoEntrada).map((key) => ({
      label: key.charAt(0) + key.slice(1).toLowerCase(),
      value: key,
    }));
  }

  initForm(): void {
    this.solicitacaoForm = this.formBuilder.group({
      nomeFuncionario: ['', Validators.required],
      tipo: ['', Validators.required],
      dataHoraOriginal: ['', Validators.required],
      dataHoraCorrigida: ['', Validators.required],
      motivo: ['', Validators.required],
    });
  }
}
