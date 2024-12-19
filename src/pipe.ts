import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
})
export class CepPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    value = value.toString();
    if (value.length === 8) {
      return value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    return value;
  }
}

@Pipe({
  name: 'CPF',
})
export class CPFPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    }
    return 'error';
  }
}

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      value = value.replace(/\D/g, '');
      if (value.length === 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else {
        value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      }
    }
    return value;
  }
}

@Pipe({
  name: 'cnpj',
})
export class CnpjPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    value = value.toString();
    if (value.length === 14) {
      return (
        value.substring(0, 2) +
        '.' +
        value.substring(2, 5) +
        '.' +
        value.substring(5, 8) +
        '/' +
        value.substring(8, 12) +
        '-' +
        value.substring(12, 14)
      );
    }
    return value;
  }
}
