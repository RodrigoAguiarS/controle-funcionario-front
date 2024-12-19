import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';

@Component({
  selector: 'app-tipo-contrato-create',
  templateUrl: './tipo-contrato-create.component.html',
  styleUrls: ['./tipo-contrato-create.component.css']
})
export class TipoContratoCreateComponent implements OnInit {

  tipoContratoForm!: FormGroup;

    constructor(
      private readonly mensagensService: MensagensService,
      private readonly tipoContratoService: TipoContratoService,
      private readonly formBuilder: FormBuilder,
      private readonly router: Router
    ) {}

    ngOnInit(): void {
      this.iniciarForm();
    }

    create(): void {
      this.tipoContratoService.create(this.tipoContratoForm.value).subscribe({
        next: (resposta) => {
          this.mensagensService.sucesso(
            'TipoContrato ' + resposta.nome + ' cadastrado com sucesso'
          );
          this.router.navigate(['tipo-contratos']);
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
      this.tipoContratoForm = this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        horasDia: [0, Validators.required],
      });
    }
  }
