import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil-update',
  templateUrl: './perfil-update.component.html',
  styleUrls: ['./perfil-update.component.css']
})
export class PerfilUpdateComponent implements OnInit {

  perfilForm!: FormGroup;
  id!: number;

  constructor(
    private readonly mensagemService: MensagensService,
    private readonly perfilService: PerfilService,
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
    this.perfilService.findById(this.id).subscribe({
      next: (perfil) => {
        this.perfilForm.patchValue(perfil);
      },
      error: (ex) => {
        this.mensagemService.erro(ex.error.message);
      },
    });
  }

  update(): void {
    this.perfilForm.value.id = this.id;
    this.perfilService.update(this.perfilForm.value).subscribe({
      next: () => {
        this.mensagemService.sucesso('Perfil atualizada com sucesso.');
        this.router.navigate(['perfis']);
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
    this.perfilForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      ativo: ['', Validators.required],
    });
  }
}
