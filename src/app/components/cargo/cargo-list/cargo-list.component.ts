import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/model/Cargo';
import { CargoService } from 'src/app/services/cargo.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css'],
})
export class CargoListComponent implements OnInit {
  cargos: Cargo[] = [];
  loading: boolean = true;

  constructor(
    private readonly cargoService: CargoService,
    private readonly mensagensService: MensagensService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.findAllCargos();
  }

  findAllCargos() {
    this.cargoService.findAll().subscribe({
      next: (cargos) => {
        this.cargos = cargos;
        this.loading = false;
      },
      error: (e) => this.mensagensService.erro(e),
      complete: () => {},
    });
  }

  entrarCadastro() {
    this.router.navigate(['cargos/create']);
  }
}
