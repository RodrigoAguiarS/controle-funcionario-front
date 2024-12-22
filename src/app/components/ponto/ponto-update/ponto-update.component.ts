import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEntrada } from 'src/app/model/TipoEntrada';
import { Usuario } from 'src/app/model/Usuario';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PontoService } from 'src/app/services/ponto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ponto-update',
  templateUrl: './ponto-update.component.html',
  styleUrls: ['./ponto-update.component.css'],
})
export class PontoUpdateComponent implements OnInit {
  pontoForm: FormGroup;
  id!: number;
  tiposEntrada: { label: string; value: string }[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly pontoService: PontoService,
    private readonly usuarioService: UsuarioService,
    private readonly router: Router,
    private readonly mensagensService: MensagensService
  ) {
    this.pontoForm = this.fb.group({
      tipo: [null, [Validators.required]],
      dataHora: [null, [Validators.required]],
      observacao: [null],
      funcionario: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.carregarUsuario();
    this.carregarPonto();
    this.carregarTiposPonto();
  }

  private carregarUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.pontoForm.get('funcionario')?.setValue(usuario.funcionario.id);
      },
      error: (error) => {
        this.mensagensService.erro(error.error.message);
      },
    });
  }

  private carregarTiposPonto(): void {
    this.tiposEntrada = Object.keys(TipoEntrada).map((key) => ({
      label: key.charAt(0) + key.slice(1).toLowerCase(),
      value: key,
    }));
  }

  carregarPonto(): void {
    this.pontoService.findById(this.id).subscribe({
      next: (ponto) => {
        this.pontoForm.patchValue({
          tipo: ponto.tipo,
          dataHora: this.formatarDataHoraParaInput(ponto.dataHora),
          observacao: ponto.observacao,
        });
      },
      error: (error) => {
        this.mensagensService.erro(
          'Erro ao carregar ponto: ' + error.error.message
        );
      },
    });
  }

  update(): void {
    if (this.pontoForm.valid) {
      const ponto = this.pontoForm.value;
      this.pontoService.editarPonto(this.id, ponto).subscribe({
        next: () => {
          this.mensagensService.sucesso('Ponto editado com sucesso');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.mensagensService.erro(
            'Erro ao editar ponto: ' + error.error.message
          );
        },
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }

  private formatarDataHoraParaInput(dataHora: string): string {
    const date = new Date(dataHora);
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
  }
}
