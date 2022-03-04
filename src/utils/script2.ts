import { lib, PBKDF2, AES, pad, mode, enc } from "crypto-js";

// Code goes here
export let keySize = 256;
export let ivSize = 128;
export let iterations = 100;

export let message = "Hello World";
export let password = "Secret Password";


export function encrypt(msg: string, pass: string) {
  let salt = lib.WordArray.random(128 / 8);

  let key = PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations: iterations
  });

  let iv = lib.WordArray.random(128 / 8);

  let encrypted = AES.encrypt(msg, key, {
    iv: iv,
    padding: pad.Pkcs7,
    mode: mode.CBC

  });

  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  let transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return transitmessage;
}

export function decrypt(transitmessage: string, pass: string) {
  let salt = enc.Hex.parse(transitmessage.substr(0, 32));
  let iv = enc.Hex.parse(transitmessage.substr(32, 32))
  let encrypted = transitmessage.substring(64);

  let key = PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations: iterations
  });

  let decrypted = AES.decrypt(encrypted, key, {
    iv: iv,
    padding: pad.Pkcs7,
    mode: mode.CBC

  })
  return decrypted;
}

export let encrypted = encrypt(message, password);
export let decrypted = decrypt(encrypted, password);

// console.log("Encrypted: "+encrypted);
// console.log("Decrypted: "+ decrypted.toString(enc.Utf8) );
