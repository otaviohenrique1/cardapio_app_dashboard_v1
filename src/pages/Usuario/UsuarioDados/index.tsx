import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { BotaoLink } from "../../../components/Botoes";
import { ContainerApp } from "../../../components/ContainerApp";
import { ItemListaFichaDados } from "../../../components/Lista";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { FormataData, FormataExibicaoSenha } from "../../../utils/utils";

interface DataTypes {
  id: string;
  nome: string;
  email: string;
  senha: string;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

const valoresIniciais: DataTypes = {
  id: "",
  nome: "",
  email: "",
  senha: "",
  data_cadastro: "",
  codigo: "",
  data_modificacao_cadastro: ""
};

export function UsuarioDados() {
  const [data, setData] = useState<DataTypes>(valoresIniciais);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    api.get(`usuario/${id}`)
      .then((item) => {
        setData({
          id: id,
          nome: item.data.nome,
          email: item.data.email,
          senha: FormataExibicaoSenha(item.data.senha),
          codigo: (item.data.codigo),
          data_cadastro: FormataData(item.data.data_cadastro),
          data_modificacao_cadastro: FormataData(item.data.data_cadastro_cadastro),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mt-3 mb-5">Dados do usuário</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ItemListaFichaDados
              titulo="Código"
              valor={data.id}
            />
            <ItemListaFichaDados
              titulo="Nome"
              valor={data.nome}
            />
            <ItemListaFichaDados
              titulo="E-mail"
              valor={data.email}
            />
            <ItemListaFichaDados
              titulo="Senha"
              valor={data.senha}
            />
            <ItemListaFichaDados
              titulo="Código"
              valor={data.codigo}
            />
            <ItemListaFichaDados
              titulo="Data de cadastro"
              valor={data.data_cadastro}
            />
            <ItemListaFichaDados
              titulo="Data de atualização do cadastro"
              valor={data.data_modificacao_cadastro}
            />
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/usuario/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}