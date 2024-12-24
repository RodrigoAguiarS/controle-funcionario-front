import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { JornadaService } from 'src/app/services/jornada.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuario: Usuario = new Usuario();
  roles: string[] = [];
  resumo: any = {
    pontos: [],
    jornadaCompleta: false,
    horasRestantes: 'PT0H0M',
    horasExtras: 'PT0H0M',
  };
  dataAtual: string = '';
  loading = false;

  constructor(
    private readonly jornadaService: JornadaService,
    private readonly usuarioService: UsuarioService,
    private readonly mensagensService: MensagensService
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        this.roles = usuario.perfis.map((perfil) => perfil.nome);
        this.carregarResumoJornada();
      },
      error: (error) => {
        this.mensagensService.erro(error.error.message);
      },
    });
  }

  private carregarResumoJornada(): void {
    this.dataAtual = this.obterDataAtualBrasileira();
    this.jornadaService
      .getResumoJornada(this.usuario.funcionario.id, this.dataAtual)
      .subscribe({
        next: (resumo) => {
          this.resumo = resumo;
        },
        error: (error) => {
          this.mensagensService.erro(error.error.message);
        },
      });
  }

  private ajustarDataParaFusoHorarioBrasileiro(data: Date): Date {
    const offset = -3;
    const utc = data.getTime() + data.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * offset);
  }

  private obterDataAtualBrasileira(): string {
    const dataAjustada = this.ajustarDataParaFusoHorarioBrasileiro(new Date());
    const ano = dataAjustada.getFullYear();
    const mes = String(dataAjustada.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAjustada.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  formatarHora(dataHora: string): string {
    const date = new Date(dataHora);
    if (isNaN(date.getTime())) {
      return 'Hora inválida';
    }
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }
}
