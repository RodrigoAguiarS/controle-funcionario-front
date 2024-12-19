
import { Cargo } from './Cargo';
import { TipoContrato } from './TipoContrato';


export class Funcionario {
  id!: number;
  cargo: Cargo = new Cargo();
  tipoContrato: TipoContrato = new TipoContrato();
}
