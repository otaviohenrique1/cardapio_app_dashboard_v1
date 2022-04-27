import * as Yup from "yup";
import { Mensagem } from "./Mensagem";
import {
  EMAIL_INVALIDO,
  valor_minimo_carateres,
  MINIMO_CARACTERES,
  valor_maximo_carateres,
  MAXIMO_CARACTERES
} from "./constantes";

export const nome = Yup
  .string()
  .required(Mensagem.MensagemErro("nome"));

export const email = Yup
  .string()
  .email(Mensagem.MensagemSimples(EMAIL_INVALIDO))
  .required(Mensagem.MensagemErro("email"));

export const senha = Yup
  .string()
  .min(valor_minimo_carateres, MINIMO_CARACTERES)
  .max(valor_maximo_carateres, MAXIMO_CARACTERES)
  .required(Mensagem.MensagemErro("senha"));


export const preco = Yup
  .number()
  .moreThan(0, Mensagem.MensagemErro("preco"))
  .required(Mensagem.MensagemErro("preco"));

export const quantidade = Yup
  .number()
  .required(Mensagem.MensagemErro("quantidade"));

export const descricao = Yup
  .string()
  .required(Mensagem.MensagemErro("descricao"));

export const ingredientes = Yup
  .array()
  .of(
    Yup.object().shape({
      nome, quantidade
    })
  )
  .required(Mensagem.MensagemErro("ingredientes"))
  .min(1, "Minimo 1 ingrediente")
// .length(0, Mensagem.MensagemErro("ingredientes"))
// .required(Mensagem.MensagemErro("ingredientes"));

export const imagens = Yup
  .array()
  // .test({
  //   message: Mensagem.MensagemErro("imagens"),
  //   test: arr => arr?.length === 0,
  // })
  // .length(0, Mensagem.MensagemErro("imagens"));
  .required(Mensagem.MensagemErro("imagens"))
  .min(1, "Minimo 1 imagem");
// .mixed()
// .test({
//   message: Mensagem.MensagemErro("imagens"),
//   test: arr => arr.length === 0,
// })

export const validacaoSchemaFormularioRefeicao = Yup
  .object()
  .shape({
    nome, preco, descricao, ingredientes, imagens
  });

export const validacaoSchemaFormularioUsuario = Yup
  .object()
  .shape({
    nome, email, senha,
  });

export const schemaValidacaoFormularioLogin = Yup
  .object()
  .shape({
    email, senha,
  });
