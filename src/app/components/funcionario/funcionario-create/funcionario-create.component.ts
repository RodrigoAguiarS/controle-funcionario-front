import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/model/Cargo';
import { EnderecoResposta } from 'src/app/model/EnderecoResposta';
import { Perfil } from 'src/app/model/Perfil';
import { TipoContrato } from 'src/app/model/TipoContrato';
import { CargoService } from 'src/app/services/cargo.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.css'],
})
export class FuncionarioCreateComponent implements OnInit {
  usuarioForm!: FormGroup;
  perfis: Perfil[] = [];
  cargos: Cargo[] = [];
  tiposContrato: TipoContrato[] = [];
  hide: boolean = true;

  constructor(
    private readonly mensagensService: MensagensService,
    private readonly perfilService: PerfilService,
    private readonly cargoService: CargoService,
    private readonly tipoContrato: TipoContratoService,
    private readonly enderecoService: EnderecoService,
    private readonly usuarioService: UsuarioService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarTipoContrato();
    this.carregarPerfis();
    this.carregarCargos();
  }

  create(): void {
    this.usuarioService.create(this.usuarioForm.value).subscribe({
      next: (resposta) => {
        this.mensagensService.sucesso(
          'Usuário cadastrado ' + resposta.pessoa.nome + ' com sucesso'
        );
        this.router.navigate(['home']);
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

  carregarPerfis(): void {
    this.perfilService.findAll().subscribe({
      next: (perfis) => {
        this.perfis = perfis;
      },
      error: (ex) => {
        this.mensagensService.erro(ex.error.message);
      },
    });
  }

  carregarCargos(): void {
    this.cargoService.findAll().subscribe({
      next: (cargos) => {
        this.cargos = cargos;
      },
      error: (ex) => {
        this.mensagensService.erro(ex.error.message);
      },
    });
  }

  carregarTipoContrato(): void {
    this.tipoContrato.findAll().subscribe({
      next: (tiposContrato) => {
        this.tiposContrato = tiposContrato;
      },
      error: (ex) => {
        this.mensagensService.erro(ex.error.message);
      },
    });
  }

  iniciarForm(): void {
    this.usuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      confirmarSenha: ['', [Validators.required, this.confirmValidator]],
      perfil: ['', Validators.required],
      cargo: ['', Validators.required],
      tipoContrato: ['', Validators.required],
      ativo: [true],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      numero: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: ['', Validators.required],
      estado: ['', Validators.required],
    });
    this.usuarioForm.get('cep')?.valueChanges.subscribe((cep) => {
      if (cep && cep.length === 8) {
        this.buscarCep(cep);
      }
    });
  }

  buscarCep(cep: string): void {
    this.enderecoService.buscaEnderecoPorCep(cep).subscribe({
      next: (dadosCep) => {
        console.log('Resposta da API:', dadosCep); // Log para verificar a estrutura retornada

        if (Object.keys(dadosCep).length === 1 && 'erro' in dadosCep) {
          this.mensagensService.erro('CEP não encontrado ou inválido.');
        } else {
          this.preencherCamposComCep(dadosCep);
          console.log('Endereço encontrado:', dadosCep);
          this.mensagensService.sucesso('Endereço encontrado com sucesso');
        }
      },
      error: (ex) => {
        this.mensagensService.erro(
          'Erro ao buscar o endereço. Tente novamente.'
        );
      },
    });
  }

  preencherCamposComCep(dadosCep: EnderecoResposta): void {
    this.usuarioForm.patchValue({
      cep: dadosCep.cep,
      rua: dadosCep.logradouro,
      bairro: dadosCep.bairro,
      cidade: dadosCep.localidade,
      estado: dadosCep.uf,
    });
  }

  confirmValidator = (control: FormGroup): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.usuarioForm.controls['senha'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  checkPasswordMatch(): void {
    const senhaControl = this.usuarioForm?.get('senha');
    const confirmarSenhaControl = this.usuarioForm?.get('confirmarSenha');

    if (senhaControl && confirmarSenhaControl) {
      const novaSenha = senhaControl.value;
      const confirmarSenha = confirmarSenhaControl.value;

      if (confirmarSenha !== novaSenha) {
        this.mensagensService.erro('As senhas não são iguais');
      }
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    console.log('Tecla pressionada:', event.key);
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
