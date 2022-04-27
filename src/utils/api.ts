import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3333/'
});

export default api;

/* ApiBuscaLoginEmpresa */
export interface ApiBuscaLoginEmpresaTypes {
  data: { email: string; senha: string; };
  auth: { username: string; password: string; };
}

export function ApiBuscaLoginEmpresa(data_login: ApiBuscaLoginEmpresaTypes) {
  // api.post('usuario/login', data, { auth })
  const { data, auth } = data_login;
  return api.post('usuario/login', data, { auth });
}

/* ApiCadastroEmpresa */
export interface ApiCadastroEmpresaTypes {
  nome: string;
  email: string;
  senha: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

export function ApiCadastroEmpresa(data_cadastro: ApiCadastroEmpresaTypes) {
  // api.post('usuario', data)
  return api.post('usuario', data_cadastro);
}

/* ApiEdicaoEmpresa */
export interface ApiEdicaoEmpresaTypes {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data_modificacao_cadastro: string;
}

export function ApiEdicaoEmpresa(data_edicao: ApiEdicaoEmpresaTypes) {
  // api.put(`usuario/${id}`, data)
  return api.put(`usuario/${data_edicao.id}`, data_edicao);
}

/* ApiBuscaDadosUmaEmpresa */
export function ApiBuscaDadosUmaEmpresa(id: string) {
  // api.get(`usuario/${id}`)
  // api.get(`usuario/${id}`)
  return api.get(`usuario/${id}`);
}

/* ApiCadastroRefeicao */
export function ApiCadastroRefeicao(data_cadastro: FormData) {
  // api.post('refeicao', data)
  return api.post('refeicao', data_cadastro);
}

/* ApiEdicaoRefeicao */
export function ApiEdicaoRefeicao(id: string, data_edicao: FormData) {
  // api.put(`refeicao/${id}`, data)
  return api.put(`refeicao/${id}`, data_edicao);
}

/* ApiBuscaDadosUmaRefeicao */
export function ApiBuscaDadosUmaRefeicao(id: string) {
  // api.get(`refeicao/${id}`)
  return api.get(`refeicao/${id}`);
}

/* ApiBuscaDadosTodasRefeicoes */
export function ApiBuscaDadosTodasRefeicoes(id: string) {
  // api.get(`refeicao/cardapio/${valida_id}`)
  return api.get(`refeicao/cardapio/${id}`);
}

/* ApiRemoveRefeicao */
export function ApiRemoveRefeicao(id: string) {
  // api.delete(`refeicao/${id_refeicao}`)
  return api.delete(`refeicao/${id}`);
}
