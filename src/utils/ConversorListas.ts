interface ListaTypes {
  nome: string;
}

export class ConversorListas {
  /**
   * Converte array de objetos lista de ingredientes para uma string
   * JSON.stringify(lista)
   */
  static ConverteArrayObjetosParaString(lista: ListaTypes[]) {
    return JSON.stringify(lista);
  }

  /**
   * Converte string lista de ingredientes para uma array de objetos
   * JSON.parse(texto)
   */
  static ConverteStringParaArrayObjetos(texto: string) {
    return JSON.parse(texto);
  }
}