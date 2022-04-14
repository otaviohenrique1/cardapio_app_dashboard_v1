import { format } from "date-fns";

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
   * @returns Valor com tipo string
   */
  static ValidaStatusRefeicao(valor: boolean) {
    const ATIVO = 'Ativo';
    const INATIVO = 'Inativo';

    let resultado = (valor) ? ATIVO : INATIVO;
    return resultado;
  }
}