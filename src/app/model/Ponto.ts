import { TipoEntrada } from "./TipoEntrada";

export class Ponto {
  id!: number;
  tipo: TipoEntrada = TipoEntrada.ENTRADA;
  dataHora!: string ;
  funcionarioId!: number;
}
