import { format } from "date-fns";
import { SHA512, enc } from "crypto-js";

export function sha512(senha: string) {
  return SHA512(senha).toString(enc.Hex);
}

export function FormataExibicaoSenha(senha: string): string {
  return (senha).replaceAll(/[0-9a-zA-Z]/g, '*').slice(0, 20);
}

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
