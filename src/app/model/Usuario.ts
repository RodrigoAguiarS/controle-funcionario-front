
import { Cargo } from './Cargo';
import { Perfil } from './Perfil';
import { Pessoa } from './Pessoa';
import { TipoContrato } from './TipoContrato';


export class Usuario {
  id!: number;
  pessoa: Pessoa = new Pessoa();
  email!: string;
  senha!: string;
  perfis!: Perfil[];
  ativo!: boolean;
  cargo: Cargo = new Cargo();
  tipoContrato: TipoContrato = new TipoContrato();
}
