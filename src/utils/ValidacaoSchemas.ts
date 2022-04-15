import * as Yup from "yup";
import { Mensagem } from "./Mensagem";
import {
  valor_minimo_ingredientes,
  MINIMO_INGREDIENTES,
  EMAIL_INVALIDO,
  valor_minimo_carateres,
  MINIMO_CARACTERES,
  valor_maximo_carateres,
  MAXIMO_CARACTERES
} from "./constantes";

const nome = Yup
  .string()
  .required(Mensagem.MensagemErro("nome"));

const email = Yup
  .string()
  .email(Mensagem.MensagemSimples(EMAIL_INVALIDO))
  .required(Mensagem.MensagemErro("email"));

const senha = Yup
  .string()
  .min(valor_minimo_carateres, MINIMO_CARACTERES)
  .max(valor_maximo_carateres, MAXIMO_CARACTERES)
  .required(Mensagem.MensagemErro("senha"));


const preco = Yup
  .number()
  .moreThan(0, Mensagem.MensagemErro("preco"))
  .required(Mensagem.MensagemErro("preco"));

const ingredientes = Yup
  .array()
  .of(
    Yup.object().shape({
      nome: Yup
        .string()
        .required(Mensagem.MensagemErro("nome do ingrediente"))
    })
  )
  .min(valor_minimo_ingredientes, MINIMO_INGREDIENTES)
  .required(Mensagem.MensagemErro("ingredientes"));

export const validacaoSchemaFormularioRefeicao = Yup.object().shape({
  nome, preco, ingredientes
});

export const validacaoSchemaFormularioUsuario = Yup.object().shape({
  nome, email, senha,
});

export const schemaValidacaoFormularioLogin = Yup.object().shape({
  email, senha,
});
