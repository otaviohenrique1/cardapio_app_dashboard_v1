import { AES, enc, format, lib, SHA512 } from "crypto-js";

export class FormatadorCrypto {
  /**
   * Converte mensagem para um hash usando SHA512.
   * @param mensagem Valor do tipo string
   * @return Valor hash
   */
  static mensagemSHA512(mensagem: string) {
    const resultado = SHA512(mensagem).toString(enc.Hex);
    return resultado;
  }

  /**
   * Ecripta uma mensagem
   * @param mensagem Valor com tipos string | lib.WordArray
   * @returns Valor do tipo string
   */
  static encrypt_message(mensagem: string | lib.WordArray) {
    const secret_key = "chave_teste"; /* alterar, colocar chave RSA */
    let resultado = AES
      .encrypt(mensagem, secret_key)
      .toString(format.OpenSSL);
    return resultado;
  }

  /**
   * Decripta uma mensagem encriptada
   * @param mensagem Valor com tipos string | lib.CipherParams
   * @returns Valor do tipo string
   */
  static decrypt_message(mensagem: string | lib.CipherParams) {
    const secret_key = "chave_teste"; /* alterar, colocar chave RSA */
    let resultado = AES
      .decrypt(mensagem, secret_key)
      .toString(enc.Utf8);
    return resultado;
  }
}

/*
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
*/