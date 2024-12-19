import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';

@Component({
  selector: 'app-tipo-contrato-delete',
  templateUrl: './tipo-contrato-delete.component.html',
  styleUrls: ['./tipo-contrato-delete.component.css'],
})
export class TipoContratoDeleteComponent implements OnInit {
  tipoContratoForm!: FormGroup;
  id!: number;

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly tipoContratoService: TipoContratoService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.iniciarForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.iniciarForm();
    this.carregarTipoContratos();
  }

  carregarTipoContratos(): void {
    this.tipoContratoService.findById(this.id).subscribe({
      next: (tipoContrato) => {
        this.tipoContratoForm.patchValue(tipoContrato);
        this.tipoContratoForm.disable();
      },
      error: (ex) => {
        this.mensagensService.erro(ex.error.message);
      },
    });
  }

  delete(): void {
    this.tipoContratoForm.value.id = this.id;
    this.tipoContratoService.delete(this.tipoContratoForm.value.id).subscribe({
      next: () => {
        this.mensagensService.sucesso('TipoContrato apagado com sucesso.');
        this.router.navigate(['tipoContratos']);
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
