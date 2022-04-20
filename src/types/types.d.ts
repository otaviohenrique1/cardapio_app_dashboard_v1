/* Types */
type ButtonColors =
  "primary" |
  "secondary" |
  "success" |
  "danger" |
  "warning" |
  "info" |
  "light" |
  "dark" |
  "link";

type DataHoraFormatos =
  "HH:mm" |
  "HH:mm:ss" |
  "dd/MM/yyyy" |
  "yyyy-MM-dd" |
  'yyyy-MM-dd HH:mm' |
  'dd/MM/yyyy HH:mm' |
  'yyyy-MM-dd HH:mm:ss' |
  'dd/MM/yyyy HH:mm:ss';

type CampoInputTypes =
  "text" |
  "number" |
  "email" |
  "password";

/* Parte da Tabela da Homepage */
interface TabelaTypes {
  id: number;
  nome: string;
  preco: number;
  ativo: string;
}

/* Parte do Login */
interface LoginTypes {
  email: string;
  senha: string;
}

interface UsuarioLogadoTypes {
  id: string;
  nome: string;
}

/* Parte do Usuario */
interface UsuarioTypes {
  nome: string;
  email: string;
  senha: string;
}

interface UsuarioDadosTypes extends UsuarioTypes {
  id: string;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

/* Parte da Refeicao */
interface IngredientesTypes {
  nome: string;
  quantidade: number;
}

interface RefeicaoTypes {
  nome: string;
  preco: string | number;
  ingredientes: IngredientesTypes[];
  descricao: string;
  ativo: string | boolean;
  imagens: File[];
}

interface ImagemTypes {
  id: string;
  path: string;
}

interface RefeicaoDadosTypes extends RefeicaoTypes {
  id: string;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
  imagens: ImagemTypes[];
}

/*
  type ButtonColors =
    "primary" |
    "secondary" |
    "success" |
    "danger" |
    "warning" |
    "info" |
    "light" |
    "dark" |
    "link";

  type DataHoraFormatos =
    "HH:mm" |
    "HH:mm:ss" |
    "dd/MM/yyyy" |
    "yyyy-MM-dd" |
    'yyyy-MM-dd HH:mm' |
    'dd/MM/yyyy HH:mm' |
    'yyyy-MM-dd HH:mm:ss' |
    'dd/MM/yyyy HH:mm:ss';
  interface TabelaTypes {
    id: number;
    nome: string;
    preco: number;
    ativo: string;
  }
  interface FormularioLoginTypes {
    email: string;
    senha: string;
  }
  interface UsuarioDadosTypes {
    id: string;
    nome: string;
    email: string;
    senha: string;
    codigo: string;
    data_cadastro: string;
    data_modificacao_cadastro: string;
  }

  interface FormularioUsuarioTypes {
    nome: string;
    email: string;
    senha: string;
  }

  interface Ingredientes {
    nome: string;
  }

  interface FormularioRefeicaoTypes {
    nome: string;
    preco: number;
    ingredientes: Ingredientes[];
    descricao: string;
    ativo: boolean;
    imagens: File[];
  }

  interface RefeicaoDadosTypes extends RefeicaoBaseTypes {
    id: string;
    // nome: string;
    // preco: string;
    // ativo: string;
    // ingredientes: Ingredientes[];
    // descricao: string;
    // imagens: File[],
    codigo: string;
    data_cadastro: string;
    data_modificacao_cadastro: string;
  }

  interface RefeicaoBaseTypes {
    nome: string;
    preco: string;
    ingredientes: Ingredientes[];
    descricao: string;
    ativo: string;
    imagens: File[];
  }
*/
