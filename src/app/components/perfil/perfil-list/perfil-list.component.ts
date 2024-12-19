import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/model/Perfil';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})
export class PerfilListComponent implements OnInit {

  perfis: Perfil[] = [];
  loading: boolean = true;

  constructor(
    private readonly perfilService: PerfilService,
    private readonly mensagensService: MensagensService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.findAllPerfis();
  }

  findAllPerfis() {
    this.perfilService.findAll().subscribe({
      next: (perfis) => {
        this.perfis = perfis;
        this.loading = false;
      },
      error: (e) => this.mensagensService.erro(e),
      complete: () => {},
    });
  }

  entrarCadastro() {
    this.router.navigate(['perfis/create']);
  }
}
