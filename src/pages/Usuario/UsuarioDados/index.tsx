import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { ItemListaFichaDados } from "../../../components/Lista";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { FormataData } from "../../../utils/utils";

interface DataTypes {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data_cadastro: string;
}

const valoresIniciais: DataTypes = {
  id: "",
  nome: "",
  email: "",
  senha: "",
  data_cadastro: "",
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
          senha: (item.data.senha).replaceAll(/[0-9a-zA-Z]/g, '*'),
          data_cadastro: FormataData(item.data.data_cadastro),
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
              titulo="Data de cadastro"
              valor={data.data_cadastro}
            />
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <Link to={`/usuario/${id}/edicao`} className="btn btn-primary">Editar</Link>
        </Col>
      </Row>
    </ContainerApp>
  );
}