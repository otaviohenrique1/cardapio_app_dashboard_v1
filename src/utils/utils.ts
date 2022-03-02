import { format } from "date-fns";

export function FormataDataHora(valor: Date) {
  let dataFinal = format(valor, 'dd/MM/yyyy');
  let horaFinal = format(valor, 'HH:mm');
  return `${dataFinal} às ${horaFinal}`;
}

export function FormataData(valor: string) {
  return format(new Date(valor), 'dd/MM/yyyy');
}

export function FormataValorMonetarioTexto(valor: number) {
  return valor.toFixed(2).toString().replace('.', ',');
}

export function Mensagem(texto: string) {
  return texto;
}

export function MensagemErro(campo: string) {
  return Mensagem(`Campo ${campo} esta vazio`);
}

/*
  let users = [{ name: 'jeca' }, { name: 'jaca' }];
  
  Exemplo de Array de Objetos para String
    let result = users.map(x => x.name).join(';');

  Exemplo de String para Array de Objetos
    let result2 = result.split(';');
    let result3 = result2.map(x => {
      return { name: x };
    });
*/

/**
 * Converte array de objetos lista de ingredientes para uma string
 */
export function ConverteArrayObjetosParaString(lista: { nome: string }[]) {
  let conveteParaArraySimples = lista.map(item => item.nome);
  let converteParaString = conveteParaArraySimples.join(';');
  return converteParaString;
}

/**
 * Converte string lista de ingredientes para uma array de objetos
 */
export function ConverteStringParaArrayObjetos(texto: string) {
  let converteParaArraySimples = texto.split(';');
  let converteParaArrayDeObjetos = converteParaArraySimples.map(item => {
    return { nome: item };
  });
  return converteParaArrayDeObjetos;
}

/*
  Exemplo
    let myArr = [{x1:0,x2:2000,y:300},{x1:50,x2:250,y:500}];
    let myArrString = JSON.stringify(myArr);
    let myArrParse = JSON.parse(myArrString);
*/

/**
 * Converte array de objetos lista de ingredientes para uma string
 */
export function ConverteArrayObjetosParaString2(lista: { nome: string }[]) {
  return JSON.stringify(lista);
}

/**
 * Converte string lista de ingredientes para uma array de objetos
 */
export function ConverteStringParaArrayObjetos2(texto: string) {
  return JSON.parse(texto);
}
