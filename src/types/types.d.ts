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
  tipo_produto: string;
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
  confirmacao_senha: string;
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
  quantidade: number | string;
  unidade_quantidade: string;
  removivel: boolean;
}

interface FotoTypes {
  id: number;
  url: string;
  nome: string;
}

interface RefeicaoBaseTypes {
  nome: string;
  preco: string | number;
  ingredientes: IngredientesTypes[];
  descricao: string;
  ativo: string | boolean;
}

interface RefeicaoFormularioCadastroTypes extends RefeicaoBaseTypes {
  imagens: File[];
  imagens_antigas: FotoTypes[];
}

interface RefeicaoDadosFichaTypes extends RefeicaoBaseTypes {
  id: string;
  imagens_galeria: FotoTypes[];
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

interface RefeicaoFormularioEdicaoTypes extends RefeicaoBaseTypes {
  id: string;
  imagens: File[];
  imagens_antigas: FotoTypes[];
  imagens_removidas: FotoTypes[];
  data_modificacao_cadastro: string;
}

interface IngredientesOpcionaisTypes {
  nome: string;
  preco: number;
}

interface RefeicaoTypes {
  nome: string;
  preco: string | number;
  ingredientes: IngredientesTypes[];
  ingredientes_opcionais: IngredientesOpcionaisTypes[];
  quantidade: number | string,
  unidade_quantidade: string,
  tipo_produto: string,
  descricao: string;
  ativo: string | boolean;
  imagens: File[];
  imagens_galeria: FotoTypes[];
  imagens_antigas: FotoTypes[];
  imagens_removidas: FotoTypes[];
  id: string;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}