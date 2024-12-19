import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from 'src/app/services/cargo.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-cargo-update',
  templateUrl: './cargo-update.component.html',
  styleUrls: ['./cargo-update.component.css']
})
export class CargoUpdateComponent implements OnInit {

  cargoForm!: FormGroup;
    id!: number;

    constructor(
      private readonly mensagemService: MensagensService,
      private readonly cargoService: CargoService,
      private readonly formBuilder: FormBuilder,
      private readonly route: ActivatedRoute,
      private readonly router: Router
    ) {
      this.initForm();
    }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.initForm();
      this.loadCategoria();
    }

    loadCategoria(): void {
      this.cargoService.findById(this.id).subscribe({
        next: (cargo) => {
          this.cargoForm.patchValue(cargo);
        },
        error: (ex) => {
          this.mensagemService.erro(ex.error.message);
        },
      });
    }

    update(): void {
      this.cargoForm.value.id = this.id;
      this.cargoService.update(this.cargoForm.value).subscribe({
        next: () => {
          this.mensagemService.sucesso('Cargo atualizada com sucesso.');
          this.router.navigate(['cargos']);
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
      this.cargoForm = this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        salario: [0, Validators.required],
      });
    }
  }
