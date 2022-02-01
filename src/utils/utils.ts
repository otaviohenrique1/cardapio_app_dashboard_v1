import { format } from "date-fns";

export function FormataDataHora(valor: Date) {
  let dataFinal = format(valor, 'dd/MM/yyyy');
  let horaFinal = format(valor, 'HH:mm');
  return `${dataFinal} às ${horaFinal}`;
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
