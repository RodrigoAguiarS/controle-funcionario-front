import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil-delete',
  templateUrl: './perfil-delete.component.html',
  styleUrls: ['./perfil-delete.component.css']
})
export class PerfilDeleteComponent implements OnInit {

  perfilForm!: FormGroup;
  id!: number;

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly perfilService: PerfilService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.iniciarForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.iniciarForm();
    this.carregarPerfis();
  }

  carregarPerfis(): void {
    this.perfilService.findById(this.id).subscribe({
      next: (perfil) => {
        this.perfilForm.patchValue(perfil);
        this.perfilForm.disable();
      },
      error: (ex) => {
        this.mensagensService.erro(ex.error.message);
      },
    });
  }

  delete(): void {
    this.perfilForm.value.id = this.id;
    this.perfilService.delete(this.perfilForm.value.id).subscribe({
      next: () => {
        this.mensagensService.sucesso('Perfil apagado com sucesso.');
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

  iniciarForm(): void {
    this.perfilForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      ativo: ['', Validators.required],
    });
  }
}
