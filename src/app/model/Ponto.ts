import { TipoEntrada } from "./TipoEntrada";

export class Ponto {
  id!: number;
  tipo: TipoEntrada = TipoEntrada.ENTRADA;
  dataHora!: string ;
  observacao!: string ;
  funcionario!: number;
}
