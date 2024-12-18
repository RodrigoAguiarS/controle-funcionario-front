import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/model/Credenciais';
import { AuthService } from 'src/app/services/auth.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  credenciais: Credenciais = new Credenciais();

  constructor(
    private readonly service: AuthService,
    private readonly router: Router,
    private readonly mensagensService: MensagensService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  /*
   * Método que realiza o login do usuário
   */
  logar() {
    if (this.form.valid) {
      localStorage.removeItem('token');
      this.credenciais = this.form.value;
      this.service.authenticate(this.credenciais).subscribe({
        next: (resposta) => {
          this.service.successfulLogin(
            resposta.headers.get('Authorization')?.substring(7) ?? ''
          );
          this.mensagensService.sucesso('Usuário logado com sucesso');
          this.router.navigate(['home']);
        },
        error: (error) => {
          const errorMessage = JSON.parse(error.error).message;
          this.mensagensService.erro(errorMessage);
        },
      });
    }
  }

  /*
  Método que verifica se os campos do formulário são válidos
  */
  validaCampos(): boolean {
    return this.form.valid;
  }
}
