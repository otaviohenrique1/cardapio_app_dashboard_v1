interface FormularioRefeicaoTypes {
  nome: string;
  preco: number;
  ingredientes: { nome: string; }[];
  ativo: boolean;
}

interface TabelaTypes {
  id: number;
  nome: string;
  preco: number;
  ativo: string;
}

interface FormularioUsuarioTypes {
  nome: string;
  email: string;
  senha: string;
}

interface FormularioLoginTypes {
  email: string;
  senha: string;
}