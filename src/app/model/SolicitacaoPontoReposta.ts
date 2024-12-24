import { TipoEntrada } from 'src/app/model/TipoEntrada';

export class SolicitacaoPontoReposta {
  id!: number;
  nomeFuncionario!: string;
  dataHoraOriginal!: string;
  dataHoraCorrigida!: string;
  motivo!: string;
  tipo!: TipoEntrada;
  aprovado!: boolean;
}
