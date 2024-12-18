
import { Cargo } from './Cargo';
import { Perfil } from './Perfil';
import { Pessoa } from './Pessoa';


export class Usuario {
  id!: number;
  pessoa!: Pessoa;
  email!: string;
  senha!: string;
  perfis!: Perfil[];
  ativo!: boolean;
  cargo!: Cargo;
}
