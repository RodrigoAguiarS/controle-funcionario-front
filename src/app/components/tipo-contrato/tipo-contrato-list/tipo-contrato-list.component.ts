import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoContrato } from 'src/app/model/TipoContrato';
import { MensagensService } from 'src/app/services/mensagens.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';

@Component({
  selector: 'app-tipo-contrato-list',
  templateUrl: './tipo-contrato-list.component.html',
  styleUrls: ['./tipo-contrato-list.component.css']
})
export class TipoContratoListComponent implements OnInit {

  tiposContrato: TipoContrato[] = [];
    loading: boolean = true;

    constructor(
      private readonly tipoContratoService: TipoContratoService,
      private readonly mensagensService: MensagensService,
      private readonly router: Router
    ) {}

    ngOnInit(): void {
      this.findAllTiposContratos();
    }

    findAllTiposContratos() {
      this.tipoContratoService.findAll().subscribe({
        next: (tiposContrato) => {
          this.tiposContrato = tiposContrato;
          this.loading = false;
        },
        error: (e) => this.mensagensService.erro(e),
        complete: () => {},
      });
    }

    entrarCadastro() {
      this.router.navigate(['tipo-contratos/create']);
    }
  }
