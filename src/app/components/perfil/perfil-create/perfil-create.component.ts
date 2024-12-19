import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil-create',
  templateUrl: './perfil-create.component.html',
  styleUrls: ['./perfil-create.component.css'],
})
export class PerfilCreateComponent implements OnInit {
  perfilForm!: FormGroup;

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly perfilService: PerfilService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  create(): void {
    this.perfilService.create(this.perfilForm.value).subscribe({
      next: (resposta) => {
        this.mensagensService.sucesso(
          'Perfil ' + resposta.nome + ' cadastrado com sucesso'
        );
        this.router.navigate(['perfis']);
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

  initForm(): void {
    this.perfilForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      ativo: [false, Validators.required],
    });
  }
}
