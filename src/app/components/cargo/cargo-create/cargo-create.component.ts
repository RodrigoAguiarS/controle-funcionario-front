import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargoService } from 'src/app/services/cargo.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.css'],
})
export class CargoCreateComponent implements OnInit {
  cargoForm!: FormGroup;

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly cargoService: CargoService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
  }

  create(): void {
    this.cargoService.create(this.cargoForm.value).subscribe({
      next: (resposta) => {
        this.mensagensService.sucesso(
          'Cargo ' + resposta.nome + ' cadastrado com sucesso'
        );
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
