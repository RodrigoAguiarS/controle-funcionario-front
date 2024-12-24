import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitacaoPontoReposta } from 'src/app/model/SolicitacaoPontoReposta';
import { MensagensService } from 'src/app/services/mensagens.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';

@Component({
  selector: 'app-solicitacao-list',
  templateUrl: './solicitacao-list.component.html',
  styleUrls: ['./solicitacao-list.component.css'],
})
export class SolicitacaoListComponent implements OnInit {
  solicitacoes: SolicitacaoPontoReposta[] = [];
  loading: boolean = true;

  constructor(
    private readonly solicitacaoService: SolicitacaoService,
    private readonly mensagensService: MensagensService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.findAllPerfis();
  }

  findAllPerfis() {
    this.solicitacaoService.findAll().subscribe({
      next: (solicitacoes) => {
        this.solicitacoes = solicitacoes;
        this.loading = false;
      },
      error: (e) => this.mensagensService.erro(e),
      complete: () => {},
    });
  }

  entrarCadastro() {
    this.router.navigate(['perfis/create']);
  }
}
