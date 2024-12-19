import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from 'src/app/services/cargo.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-cargo-delete',
  templateUrl: './cargo-delete.component.html',
  styleUrls: ['./cargo-delete.component.css'],
})
export class CargoDeleteComponent implements OnInit {
  cargoForm!: FormGroup;
  id!: number;

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly cargoService: CargoService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.iniciarForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.iniciarForm();
    this.carregarCargos();
  }

  carregarCargos(): void {
    this.cargoService.findById(this.id).subscribe({
      next: (cargo) => {
        this.cargoForm.patchValue(cargo);
        this.cargoForm.disable();
      },
      error: (ex) => {
        this.mensagensService.erro(ex.error.message);
      },
    });
  }

  delete(): void {
    this.cargoForm.value.id = this.id;
    this.cargoService.delete(this.cargoForm.value.id).subscribe({
      next: () => {
        this.mensagensService.sucesso('Cargo apagado com sucesso.');
        this.router.navigate(['cargos']);
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
    this.cargoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      salario: [0, Validators.required],
    });
  }
}
