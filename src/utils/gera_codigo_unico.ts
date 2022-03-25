import * as uuid from "uuid";

export function gera_codigo_unico() {
  let codigo_uuid = uuid.v4();
  return codigo_uuid.toString();
}