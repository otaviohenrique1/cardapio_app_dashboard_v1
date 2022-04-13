import { format } from "date-fns";

export const FORMATO_HORA_1 = 'HH:mm';
export const FORMATO_HORA_2 = 'HH:mm:ss';
export const FORMATO_DATA_1 = 'dd/MM/yyyy';
export const FORMATO_DATA_2 = 'yyyy-MM-dd';
export const FORMATO_DATA_COM_HORA_1 = 'yyyy-MM-dd HH:mm';
export const FORMATO_DATA_COM_HORA_2 = 'dd/MM/yyyy HH:mm';
export const FORMATO_DATA_COM_HORA_3 = 'yyyy-MM-dd HH:mm:ss';
export const FORMATO_DATA_COM_HORA_4 = 'dd/MM/yyyy HH:mm:ss';

type DataHoraFormatos =
  "HH:mm" |
  "HH:mm:ss" |
  "dd/MM/yyyy" |
  "yyyy-MM-dd" |
  'yyyy-MM-dd HH:mm' |
  'dd/MM/yyyy HH:mm' |
  'yyyy-MM-dd HH:mm:ss' |
  'dd/MM/yyyy HH:mm:ss';

/**
 * Classe que formata dados.
 */
export class FormatadorDados {
  /**
   * Formata data
   * Formata um valor do tipo Date no usando
   * um formato que fica na lista DataHoraFormatos.
   * @param data Valor do tipo Date
   * @param formato Valor do tipo DataHoraFormatos
   * @return Valor do tipo string formatado
   * @example
   *  let data = new Date();
   *  let resultado = FormatadorDados.FormatadorDataHora(data, 'dd/MM/yyyy');
   *  console.log(data); // Imprime => Tue Apr 12 2022 14:34:14 GMT-0300
   *  console.log(resultado); // Imprime => 12/04/2022
   */
  static FormatadorDataHora(data: Date, formato: DataHoraFormatos) {
    let resultado = format(new Date(data), formato);
    return resultado;
  }

  /**
   * Gera data formatada
   * Pega o valor da data atual e retorna um valor
   * formata usando um formato que fica na lista DataHoraFormatos.
   * @param formato Valor do tipo DataHoraFormatos
   * @return Valor do tipo string formatado
   * @example
   *  let data = new Date();
   *  let resultado = FormatadorDados.GeradorDataHoraFormata('dd/MM/yyyy');
   *  console.log(data); // Imprime => Tue Apr 12 2022 14:34:14 GMT-0300
   *  console.log(resultado); // Imprime => 12/04/2022
   */
  static GeradorDataHoraFormatada(formato: DataHoraFormatos) {
    let resultado = format(new Date(), formato);
    return resultado;
  }

  /**
   * Formata a exibição da senha
   * Troca os caracteres da senha por '*' (asteriscos)
   * e limita o tamanho do texto em um determinado valor de caracteres.
   * @param senha Valor do tipo string
   * @param tamanho_string Valor do tipo number (Opcional)
   * @return Valor do tipo string
   * @example
   *  let senha = '01234567890123456789';
   *  console.log(FormatadorDados.FormataExibicaoSenha(senha));
   *    Valor sem '*' => 0123456789
   *    Imprime => **********
   *  console.log(FormatadorDados.FormataExibicaoSenha(senha, 12));
   *    Valor sem '*' => 012345678901
   *    Imprime => ************
   */
  static FormataExibicaoSenha(senha: string, tamanho_string?: number): string {
    let valida_tamanho_string = (tamanho_string !== undefined) ? tamanho_string : 10;
    let resultado = senha
      .replaceAll(/[0-9a-zA-Z]/g, '*')
      .slice(0, valida_tamanho_string);
    return resultado;
  }

  /**
   * Formata valor monetario
   * Substitui o '.' (ponto) por ',' (virgula),
   * fixa o valor em 2 casas decimais e
   * converte o valor do tipo number para o tipo string.
   * @param valor Valor do tipo number
   * @return Valor monetario no tipo string
   * @example
   *  10.0 => 10,0
   */
  static FormataValorMonetarioTexto(valor: number) {
    let resultado = valor
      .toFixed(2)
      .toString()
      .replace('.', ',');
    return resultado;
  }

  /**
   * Valida o status da refeição
   * Se for true => 'Ativo'
   * Se for false => 'Inativo'
   * @param valor Valor com tipo boolean
   * @returns 
   */
  static ValidaStatusRefeicao(valor: boolean) {
    const ATIVO = 'Ativo';
    const INATIVO = 'Inativo';

    let resultado = (valor) ? ATIVO : INATIVO;
    return resultado;
  }

  /* --------------------------------------------------------------------- */

  /**
   * Formata data e hora
   * Formata um valor do tipo Date no formato 'dd/MM/yyyy às HH:mm'.
   * @param data Valor do tipo Date
   * @return Valor do tipo string com formato 'dd/MM/yyyy às HH:mm'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 12/04/2022 às 14:34
   */
  static FormataDataHora(data: Date) {
    let data_formatada = this.FormataData(data);
    let hora_formatada = this.FormataHora(data);
    let resultado = `${data_formatada} às ${hora_formatada}`;
    return resultado;
  }

  /**
   * Formata hora
   * Formata um valor do tipo Date usando formato de hora 'HH:mm'.
   * @param data Valor do tipo Date
   * @return Valor do tipo string com formato 'HH:mm'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 14:34
   */
  static FormataHora(data: Date) {
    let resultado = format(new Date(data), FORMATO_HORA_1);
    return resultado;
  }

  /**
   * Formata data
   * Formata um valor do tipo Date no formato 'dd/MM/yyyy'.
   * @param data Valor do tipo Date
   * @return Valor do tipo string com formato 'dd/MM/yyyy'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 12/04/2022
   */
  static FormataData(data: Date) {
    let resultado = format(new Date(data), FORMATO_DATA_1);
    return resultado;
  }

  /**
   * Gera data formata
   * Pega o valor da data atual e retorna um valor
   * formata usando o formato de data 'dd/MM/yyyy'.
   * @return Data atual no tipo string com formato 'dd/MM/yyyy'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 12/04/2022
   */
  static GeraDataFormata() {
    let resultado = format(new Date(), FORMATO_DATA_1);
    return resultado;
  }

  /**
   * Gera data formata
   * Pega o valor da data atual e retorna um valor
   * formata usando o formato de data 'yyyy-MM-dd'.
   * @return Data atual no tipo string com formato 'yyyy-MM-dd'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 2022-04-12
   */
  static GeraDataNoFormato2() {
    let resultado = format(new Date(), FORMATO_DATA_2);
    return resultado;
  }

  /**
   * Gera data e hora formata
   * Pega o valor da data atual e retorna um valor
   * com formato 'yyyy-MM-dd HH:mm:ss'.
   * @return Data atual no tipo string com formato 'yyyy-MM-dd HH:mm:ss'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 2022-04-12 14:34:14
   */
  static GeraDataComHoraFormata() {
    let resultado = format(new Date(), FORMATO_DATA_COM_HORA_3);
    return resultado;
  }
}