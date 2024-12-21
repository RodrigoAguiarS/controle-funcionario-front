import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PontoService } from 'src/app/services/ponto.service';

@Component({
  selector: 'app-ponto-delete',
  templateUrl: './ponto-delete.component.html',
  styleUrls: ['./ponto-delete.component.css']
})
export class PontoDeleteComponent implements OnInit {

  pontoForm: FormGroup;
    id!: number;

    constructor(
      private readonly fb: FormBuilder,
      private readonly route: ActivatedRoute,
      private readonly pontoService: PontoService,
      private readonly router: Router,
      private readonly mensagensService: MensagensService
    ) {
      this.pontoForm = this.fb.group({
        tipo: [null, [Validators.required]],
        novaDataHora: [null, [Validators.required]],
      });
    }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.carregarPonto();
    }

    carregarPonto(): void {
      this.pontoService.findById(this.id).subscribe({
        next: (ponto) => {
          this.pontoForm.patchValue({
            tipo: ponto.tipo,
            novaDataHora: this.formatarDataHoraParaInput(ponto.dataHora),
          });
          this.pontoForm.disable();
        },
        error: (error) => {
          this.mensagensService.erro('Erro ao carregar ponto: ' + error.error.message);
        },
      });
    }

    delete(): void {
      this.pontoForm.value.id = this.id;
      this.pontoService.delete(this.pontoForm.value.id).subscribe({
        next: () => {
          this.mensagensService.sucesso('Ponto apagado com sucesso.');
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

    private formatarDataHoraParaInput(dataHora: string): string {
      const date = new Date(dataHora);
      const ano = date.getFullYear();
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const dia = String(date.getDate()).padStart(2, '0');
      const horas = String(date.getHours()).padStart(2, '0');
      const minutos = String(date.getMinutes()).padStart(2, '0');
      return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
    }
  }
