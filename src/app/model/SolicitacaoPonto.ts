import { Funcionario } from './Funcionario';
import { TipoEntrada } from './TipoEntrada';

export class SolicitacaoPonto {
  id!: number;
  funcionario: Funcionario = new Funcionario();
  dataHoraOriginal!: string;
  dataHoraCorrigida!: string;
  tipo!: TipoEntrada;
  motivo!: string;
  aprovado!: boolean;
}
