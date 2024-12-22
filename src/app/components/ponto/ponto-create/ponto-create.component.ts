import { Usuario } from 'src/app/model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PontoService } from 'src/app/services/ponto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoEntrada } from 'src/app/model/TipoEntrada';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ponto-create',
  templateUrl: './ponto-create.component.html',
  styleUrls: ['./ponto-create.component.css'],
})
export class PontoCreateComponent implements OnInit {
  dataAtual: Date = new Date();
  private subscription!: Subscription;
  pontoRegistrado: boolean = false;
  tipoPonto: string = '';
  carregandoTipoPonto: boolean = true;
  pontoForm!: FormGroup;

  constructor(
    private readonly pontoService: PontoService,
    private readonly usuarioService: UsuarioService,
    private readonly mensagensService: MensagensService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarUsuario();
    this.subscription = interval(1000).subscribe(() => {
      this.dataAtual = new Date();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private carregarUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.pontoForm.get('funcionario')?.setValue(usuario.funcionario.id);
        this.verificarUltimoPonto();
      },
      error: (error) => {
        this.mensagensService.erro(error.error.message);
      },
    });
  }

  registrarPonto(): void {
    this.pontoForm.get('tipo')?.setValue(this.tipoPonto);
    this.pontoForm.get('dataHora')?.setValue(this.dataAtual);
    this.pontoService.registrarPonto(this.pontoForm.value).subscribe({
      next: () => {
        this.pontoRegistrado = true;
        this.mensagensService.sucesso('Ponto registrado com sucesso');
      },
      error: (ex) => {
        this.mensagensService.erro('Erro ao registrar ponto: ' + ex.error.message);
      },
    });
  }

  private verificarUltimoPonto(): void {
    const funcionarioId = this.pontoForm.get('funcionario')?.value;
    this.pontoService.obterUltimoPonto(funcionarioId).subscribe({
      next: (ultimoPonto) => {
        if (ultimoPonto === TipoEntrada.ENTRADA) {
          this.tipoPonto = TipoEntrada.SAIDA;
        } else {
          this.tipoPonto = TipoEntrada.ENTRADA;
        }
        this.carregandoTipoPonto = false;
      },
      error: (ex) => {
        this.carregandoTipoPonto = false;
        this.tipoPonto = TipoEntrada.ENTRADA;
      },
    });
  }

  iniciarForm(): void {
    this.pontoForm = this.formBuilder.group({
      tipo: [null, [Validators.required]],
      dataHora: [null, [Validators.required]],
      observacao: ['', Validators.required],
      funcionario: [null, Validators.required],
    });
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
