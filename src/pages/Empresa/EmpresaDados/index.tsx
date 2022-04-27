import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import { ContainerApp } from "../../../components/ContainerApp";
import { ItemFichaDados } from "../../../components/Listas/ListaFichaDados/ItemFichaDados";
import { ModalErroCadastro } from "../../../components/Modals";
import { Titulo } from "../../../components/Titulo";
import { ApiBuscaDadosUmaEmpresa } from "../../../utils/api";
import { FORMATO_DATA_COM_HORA_4, valoresIniciaisUsuarioDados } from "../../../utils/constantes";
import { FormatadorDados } from "../../../utils/FormatadorDados";

export function EmpresaDados() {
  const [data, setData] = useState<UsuarioDadosTypes>(valoresIniciaisUsuarioDados);
  const { id } = useParams();

  useEffect(() => {
    if (!id) { return; }

    // api.get(`usuario/${id}`)
    ApiBuscaDadosUmaEmpresa(id)
      .then((item) => {
        const { nome, email, senha, codigo, data_cadastro, data_modificacao_cadastro } = item.data;

        const senha_formatada = FormatadorDados.FormataExibicaoSenha(String(senha), 12);
        const data_cadastro_formatada = FormatadorDados.FormatadorDataHora(data_cadastro, FORMATO_DATA_COM_HORA_4);
        const data_modificacao_cadastro_formatada = FormatadorDados.FormatadorDataHora(data_modificacao_cadastro, FORMATO_DATA_COM_HORA_4);

        const data = {
          id,
          nome: String(nome),
          email: String(email),
          senha: senha_formatada,
          codigo: String(codigo),
          data_cadastro: data_cadastro_formatada,
          data_modificacao_cadastro: data_modificacao_cadastro_formatada,
        };

        setData(data);
      })
      .catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }, [id]);

  const { nome, email, senha, codigo, data_cadastro, data_modificacao_cadastro } = data;

  const lista_dados = [
    { titulo: "Id", valor: id || "id" },
    { titulo: "Nome", valor: nome },
    { titulo: "E-mail", valor: email },
    { titulo: "Senha", valor: senha },
    { titulo: "Código", valor: codigo },
    { titulo: "Data de cadastro", valor: data_cadastro },
    { titulo: "Data de atualização do cadastro", valor: data_modificacao_cadastro },
  ];

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mt-3 mb-5">Dados perfil</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            {lista_dados.map((item, index) => <ItemFichaDados key={index} titulo={item.titulo} valor={item.valor} />)}
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/empresa/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}