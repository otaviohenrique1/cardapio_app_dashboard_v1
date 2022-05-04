export const EMAIL_INVALIDO = "Email invalido";
export const valor_minimo_carateres = 8;
export const MINIMO_CARACTERES = `Minimo de ${valor_minimo_carateres} carateres`;
export const valor_maximo_carateres = 255;
export const MAXIMO_CARACTERES = `Maximo de ${valor_maximo_carateres} carateres`;

export const FORMATO_HORA_1 = 'HH:mm';
export const FORMATO_HORA_2 = 'HH:mm:ss';
export const FORMATO_DATA_1 = 'dd/MM/yyyy';
export const FORMATO_DATA_2 = 'yyyy-MM-dd';
export const FORMATO_DATA_COM_HORA_1 = 'yyyy-MM-dd HH:mm';
export const FORMATO_DATA_COM_HORA_2 = 'dd/MM/yyyy HH:mm';
export const FORMATO_DATA_COM_HORA_3 = 'yyyy-MM-dd HH:mm:ss';
export const FORMATO_DATA_COM_HORA_4 = 'dd/MM/yyyy HH:mm:ss';

/* Usuado nos componentes EmpresaEdicao e EmpresaCadastro */
export const valoresIniciaisFormularioUsuario: UsuarioTypes = {
  nome: "",
  email: "",
  senha: "",
  confirmacao_senha: ""
};

/* Usuado no componente Login */
export const dadosIniciaisFormularioLogin: LoginTypes = {
  email: "",
  senha: ""
};

/* Usuado no componente EmpresaDados */
export const valoresIniciaisUsuarioDados: UsuarioDadosTypes = {
  id: "",
  nome: "",
  email: "",
  senha: "",
  data_cadastro: "",
  codigo: "",
  data_modificacao_cadastro: "",
  confirmacao_senha: ""
};

/* Usuado no componente ContainerApp */
export const dadosIniciaisUsuarioLogado: UsuarioLogadoTypes = {
  id: '',
  nome: ''
};

/* Usuado no componente RefeicaoCadastro */
export const valoresIniciaisFormularioCadastroRefeicao: RefeicaoFormularioCadastroTypes = {
  nome: "",
  preco: "",
  ativo: false,
  ingredientes: [
    {
      nome: "",
      quantidade: 0,
      removivel: false,
      unidade_quantidade: "",
    }
  ],
  descricao: "",
  imagens: [],
  imagens_antigas: []
};

/* Usuado no componente RefeicaoEdicao */
export const valoresIniciaisFormularioEdicaoRefeicao: RefeicaoFormularioEdicaoTypes = {
  id: "",
  nome: "",
  preco: "",
  ingredientes: [
    {
      nome: "",
      quantidade: 0,
      removivel: false,
      unidade_quantidade: "",
    }
  ],
  descricao: "",
  ativo: "",
  imagens: [],
  imagens_antigas: [],
  imagens_removidas: [],
  data_modificacao_cadastro: "",
};

/* Usuado no componente RefeicaoDados */
export const valoresIniciaisRefeicaoDados: RefeicaoDadosFichaTypes = {
  id: "",
  nome: "",
  preco: "",
  ativo: "",
  ingredientes: [
    {
      nome: "",
      quantidade:0,
      removivel: false,
      unidade_quantidade: "",
    }
  ],
  descricao: "",
  codigo: "",
  imagens_galeria: [],
  data_cadastro: "",
  data_modificacao_cadastro: ""
};

export const valoresIniciaisFormularioRefeicao: RefeicaoTypes = {
  nome: "",
  preco: "",
  ingredientes: [
    {
      nome: "",
      quantidade: 0,
      removivel: false,
      unidade_quantidade: "",
    }
  ],
  descricao: "",
  ativo: "",
  imagens: [],
  imagens_galeria: [],
  imagens_antigas: [],
  imagens_removidas: [],
  id: "",
  codigo: "",
  data_cadastro: "",
  data_modificacao_cadastro: "",
  ingredientes_opcionais: [],
  quantidade: 0,
  unidade_quantidade: "",
  tipo_produto: ""
};

// interface A {
//   nome: string;
// }

// interface B {
//   path: string;
// }

// interface C {
//   imagem: string;
// }

// interface D extends A, B, C {
//   caminho: string;
// }

// let K: D = {
//   caminho: "",
//   nome: "",
//   path: "",
//   imagem: ""
// };