import { format } from "date-fns";
import { SHA512, enc, lib } from "crypto-js";

export function sha512(senha: string) {
  return SHA512(senha).toString(enc.Hex);
}

export function gerarSalt() {;
  let salt = lib.WordArray.random(128 / 8).toString(enc.Hex);
  var key512Bits1000Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, {
    keySize: 512 / 32,
    iterations: 1000
  });
  return key512Bits1000Iterations;
}

// import { randomBytes, createHmac } from "crypto";

// export function gerarSalt(size: number) {
//   return randomBytes(size).toString('hex');
// }

// export function sha512(senha: string, salt: string) {
//   let hash = createHmac('sha512', salt);
//   hash.update(senha);
//   let hash2 = hash.digest('hex');
//   return { salt, hash2 };
// }

// export function gerarSenha(senha: string) {
//   let salt = gerarSalt(16);
//   let senhaESalt = sha512(senha, salt);
//   return senhaESalt;
// }

// export function login(senhaDoLogin: string, saltNoBanco: string, hashNoBanco: string) {
//   var senhaESalt = sha512(senhaDoLogin, saltNoBanco)
//   return hashNoBanco === senhaESalt.hash2;
// }

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
