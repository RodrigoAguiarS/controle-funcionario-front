import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor(private readonly nzMessageService: NzMessageService) { }

  /*
  * Método que exibe uma mensagem de sucesso
  */
  sucesso(mensagem: string): void {
    this.nzMessageService.success(mensagem);
  }

  /*
  * Método que exibe uma mensagem de erro
  */
  erro(mensagem: string): void {
    this.nzMessageService.error(mensagem);
  }

  /*
  * Método que exibe uma mensagem de informação
  */
  informacao(mensagem: string): void {
    this.nzMessageService.info(mensagem);
  }

  /*
  * Método que exibe uma mensagem de aviso
  */
  aviso(mensagem: string): void {
    this.nzMessageService.warning(mensagem);
  }
}
