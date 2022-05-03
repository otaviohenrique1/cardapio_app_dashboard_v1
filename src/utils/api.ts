import axios, { AxiosRequestConfig } from "axios";

const API_URL = 'http://localhost:3333/';

const axios_request_config: AxiosRequestConfig = {
  baseURL: API_URL
};

const api = axios.create(axios_request_config);

export default api;

const EMPRESA = 'empresa';
const LOGIN = 'login';
const REFEICAO = 'refeicao';
const CARDAPIO = 'cardapio';

/* ApiBuscaLoginEmpresa */
export interface ApiBuscaLoginEmpresaTypes {
  data: { email: string; senha: string; };
  auth: { username: string; password: string; };
}

export function ApiBuscaLoginEmpresa(data_login: ApiBuscaLoginEmpresaTypes) {
  // api.post('empresa/login', data, { auth })
  const { data, auth } = data_login;
  return api.post(`${EMPRESA}/${LOGIN}`, data, { auth });
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
  // api.post('empresa', data)
  return api.post(EMPRESA, data_cadastro);
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
  // api.put(`empresa/${id}`, data)
  return api.put(`${EMPRESA}/${data_edicao.id}`, data_edicao);
}

/* ApiBuscaDadosUmaEmpresa */
export function ApiBuscaDadosUmaEmpresa(id: string) {
  // api.get(`empresa/${id}`)
  // api.get(`empresa/${id}`)
  return api.get(`${EMPRESA}/${id}`);
}

/* ApiCadastroRefeicao */
export function ApiCadastroRefeicao(data_cadastro: FormData) {
  // api.post('refeicao', data)
  return api.post(REFEICAO, data_cadastro);
}

/* ApiEdicaoRefeicao */
export function ApiEdicaoRefeicao(id: string, data_edicao: FormData) {
  // api.put(`refeicao/${id}`, data)
  return api.put(`${REFEICAO}/${id}`, data_edicao);
}

/* ApiBuscaDadosUmaRefeicao */
export function ApiBuscaDadosUmaRefeicao(id: string) {
  // api.get(`refeicao/${id}`)
  return api.get(`${REFEICAO}/${id}`);
}

/* ApiBuscaDadosTodasRefeicoes */
export function ApiBuscaDadosTodasRefeicoes(id: string) {
  // api.get(`refeicao/cardapio/${valida_id}`)
  return api.get(`${REFEICAO}/${CARDAPIO}/${id}`);
}

/* ApiRemoveRefeicao */
export function ApiRemoveRefeicao(id: string) {
  // api.delete(`refeicao/${id_refeicao}`)
  return api.delete(`${REFEICAO}/${id}`);
}
