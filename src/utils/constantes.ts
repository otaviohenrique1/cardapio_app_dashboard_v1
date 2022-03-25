import * as Yup from "yup";

export const valoresIniciaisFormularioRefeicao: FormularioRefeicaoTypes = {
  nome: "",
  preco: 0,
  ativo: false,
  ingredientes: [
    { nome: '' }
  ],
  descricao: "",
  imagens: [],
};

export const valoresIniciaisFormularioUsuario: FormularioUsuarioTypes = {
  nome: "",
  email: "",
  senha: "",
};

export const dadosIniciaisFormularioLogin: FormularioLoginTypes = {
  email: "",
  senha: ""
};

export const validacaoSchemaFormularioRefeicao = Yup.object().shape({
  nome: Yup
    .string()
    .required("Campo nome vazio"),
  preco: Yup
    .number()
    .moreThan(0, "Campo preco vazio")
    .required("Campo preco vazio"),
  ingredientes: Yup.array().of(
    Yup.object().shape({
      nome: Yup
        .string()
        .required("Campo nome do ingrediente vazio")
    })
  )
    .min(1, 'Minimo 1 ingrediente')
    .required("Campo ingredientes vazio")
});

export const validacaoSchemaFormularioUsuario = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  email: Yup.string().email("E-mail invalido").required("Campo vazio"),
  senha: Yup.string().min(8, "Minimo 8 carateres").max(64, 'Maximo 64 carateres').required("Campo vazio"),
});

export const schemaValidacaoFormularioLogin = Yup.object().shape({
  email: Yup.string().required('Campo vazio'),
  senha: Yup.string().required('Campo vazio'),
});
