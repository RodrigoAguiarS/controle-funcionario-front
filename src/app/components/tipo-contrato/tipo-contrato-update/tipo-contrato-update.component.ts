import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';

@Component({
  selector: 'app-tipo-contrato-update',
  templateUrl: './tipo-contrato-update.component.html',
  styleUrls: ['./tipo-contrato-update.component.css'],
})
export class TipoContratoUpdateComponent implements OnInit {
  tipoContratoForm!: FormGroup;
  id!: number;

  constructor(
    private readonly mensagemService: MensagensService,
    private readonly tipoContratoService: TipoContratoService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initForm();
    this.carregarTipoContrato();
  }

  carregarTipoContrato(): void {
    this.tipoContratoService.findById(this.id).subscribe({
      next: (tipoContrato) => {
        this.tipoContratoForm.patchValue(tipoContrato);
      },
      error: (ex) => {
        this.mensagemService.erro(ex.error.message);
      },
    });
  }

  update(): void {
    this.tipoContratoForm.value.id = this.id;
    this.tipoContratoService.update(this.tipoContratoForm.value).subscribe({
      next: () => {
        this.mensagemService.sucesso('TipoContrato atualizada com sucesso.');
        this.router.navigate(['tipoContratos']);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: ErrorEvent) => {
            this.mensagemService.erro(element.message);
          });
        } else {
          this.mensagemService.erro(ex.error.message);
        }
      },
    });
  }

  initForm(): void {
    this.tipoContratoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      horasDia: [0, Validators.required],
    });
  }
}
