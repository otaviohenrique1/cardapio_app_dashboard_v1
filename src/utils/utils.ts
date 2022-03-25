import { format } from "date-fns";
import { SHA512, enc, lib, PBKDF2 } from "crypto-js";

export function sha512(senha: string) {
  return SHA512(senha).toString(enc.Hex);
}

export function gerarSalt() {;
  return lib.WordArray.random(128 / 8).toString(enc.Hex);
}

export function gerarKey512Bits1000Iterations(senha: string, salt: string) {;
  // var key512Bits1000Iterations = CryptoJS.PBKDF2(senha, salt, {
  //   keySize: 512 / 32,
  //   iterations: 1000
  // });
  var key512Bits1000Iterations = CryptoJS.PBKDF2(senha, salt);
  return key512Bits1000Iterations;
}

// export function gerarSenha(senha: string) {
//   let salt = gerarSalt();
//   let senhaESalt = sha512(senha);
// }

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

export function gerarPBKDF2(senha: string, salt: string) {
  let keySize = 256;
  // let iterations = 1000;
  let key = PBKDF2(senha, salt, {
    keySize: keySize / 32,
    // iterations: iterations
  });
  return key;
}

// export function encryptSenha(msg: string, senha: string) {
//   let salt = gerarSalt();
//   return;
// }

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
