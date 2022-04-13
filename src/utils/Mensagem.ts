/**
 * Classe que exibe mensagem.
 */
export class Mensagem {
  /**
   * Mensagem simples.
   * @param mensagem Valor do tipo string
   * @return Valor do tipo string
   */
  static MensagemSimples(mensagem: string) {
    return mensagem;
  }

  /**
   * Mensagem de erro.
   * @param nome_campo Valor do tipo string
   * @return Valor do tipo string
   */
  static MensagemErro(nome_campo: string) {
    let texto = `Campo ${nome_campo} esta vazio`;
    let resultado = this.MensagemSimples(texto);
    return resultado;
  }
}