
import { Funcionario } from './Funcionario';
import { Perfil } from './Perfil';
import { Pessoa } from './Pessoa';


export class Usuario {
  id!: number;
  pessoa: Pessoa = new Pessoa();
  email!: string;
  senha!: string;
  perfis!: Perfil[];
  ativo!: boolean;
  funcionario: Funcionario = new Funcionario();
}
