export const EMAIL_INVALIDO = "Email invalido";
export const valor_minimo_carateres = 8;
export const MINIMO_CARACTERES = `Minimo ${valor_minimo_carateres} carateres`;
export const valor_maximo_carateres = 64;
export const MAXIMO_CARACTERES = `Maximo ${valor_maximo_carateres} carateres`;
export const valor_minimo_ingredientes = 1;
export const MINIMO_INGREDIENTES = `Minimo ${valor_minimo_ingredientes} carateres`;

export const FORMATO_HORA_1 = 'HH:mm';
export const FORMATO_HORA_2 = 'HH:mm:ss';
export const FORMATO_DATA_1 = 'dd/MM/yyyy';
export const FORMATO_DATA_2 = 'yyyy-MM-dd';
export const FORMATO_DATA_COM_HORA_1 = 'yyyy-MM-dd HH:mm';
export const FORMATO_DATA_COM_HORA_2 = 'dd/MM/yyyy HH:mm';
export const FORMATO_DATA_COM_HORA_3 = 'yyyy-MM-dd HH:mm:ss';
export const FORMATO_DATA_COM_HORA_4 = 'dd/MM/yyyy HH:mm:ss';

export const valoresIniciaisFormularioRefeicao: RefeicaoTypes = {
  nome: "",
  preco: "",
  ativo: false,
  ingredientes: [
    { nome: "", quantidade: "" }
  ],
  descricao: "",
  imagens: [],
  imagens_antigas: []
};

export const valoresIniciaisFormularioUsuario: UsuarioTypes = {
  nome: "",
  email: "",
  senha: "",
};

export const dadosIniciaisFormularioLogin: LoginTypes = {
  email: "",
  senha: ""
};

export const valoresIniciaisUsuarioDados: UsuarioDadosTypes = {
  id: "",
  nome: "",
  email: "",
  senha: "",
  data_cadastro: "",
  codigo: "",
  data_modificacao_cadastro: ""
};

export const valoresIniciaisRefeicaoDados: RefeicaoDadosTypes = {
  id: "",
  nome: "",
  preco: "",
  ativo: "",
  ingredientes: [
    { nome: "", quantidade: "" }
  ],
  descricao: "",
  codigo: "",
  imagens: [],
  data_cadastro: "",
  data_modificacao_cadastro: "",
  imagens_antigas: []
};

export const dadosIniciaisUsuarioLogado: UsuarioLogadoTypes = {
  id: '',
  nome: ''
};