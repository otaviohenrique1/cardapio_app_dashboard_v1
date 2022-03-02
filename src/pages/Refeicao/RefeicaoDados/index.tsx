import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
// import { UncontrolledCarousel } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { FormataData, FormataValorMonetarioTexto } from "../../../utils/utils";
import { Link } from "react-router-dom";
import { ItemListaFichaDados } from "../../../components/Lista";

interface RefeicaoDadosTypes {
  id: string;
  nome: string;
  preco: number;
  ativo: boolean;
  ingredientes: string;
  data_cadastro: string;
}

const valoresIniciaisRefeicaoDados: RefeicaoDadosTypes = {
  id: "",
  nome: "",
  preco: 0,
  ativo: false,
  ingredientes: "",
  data_cadastro: ""
};

export function RefeicaoDados() {
  const [data, setData] = useState<RefeicaoDadosTypes>(valoresIniciaisRefeicaoDados);
  let { id } = useParams();

  useEffect(() => {
    api.get(`refeicao/${id}`)
      .then((item) => {
        if (!id) {
          return;
        }

        const nome = item.data.nome;
        const preco = item.data.preco;
        const ativo = item.data.ativo;
        const ingredientes = JSON.parse(String(item.data.ingredientes));
        const data_cadastro = FormataData(item.data.data_cadastro);

        setData({ id, nome, preco, ativo, ingredientes, data_cadastro });
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, [id]);

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">{data.nome}</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ItemListaFichaDados
              titulo="Código"
              valor={data.id}
            />
            <ItemListaFichaDados
              titulo="Preço (R$)"
              valor={FormataValorMonetarioTexto(data.preco)}
            />
            <ItemListaFichaDados
              titulo="Status"
              valor={(data.ativo) ? 'Ativo' : 'Inativo'}
            />
            <ItemListaFichaDados
              titulo="Ingredientes"
              valor={data.ingredientes}
            />
            <ItemListaFichaDados
              titulo="Data de cadastro"
              valor={data.data_cadastro}
            />
          </ListGroup>
        </Col>
        {/* <Col md={12} className="d-flex flex-column justify-content-center align-content-center mt-5">
          <UncontrolledCarousel
            items={[
              {
                altText: 'Slide 1',
                caption: 'Slide 1',
                key: 1,
                src: 'https://picsum.photos/id/123/1200/600'
              },
              {
                altText: 'Slide 2',
                caption: 'Slide 2',
                key: 2,
                src: 'https://picsum.photos/id/456/1200/600'
              },
              {
                altText: 'Slide 3',
                caption: 'Slide 3',
                key: 3,
                src: 'https://picsum.photos/id/678/1200/600'
              }
            ]}
          />
        </Col> */}
        <Col md={12} className="d-flex justify-content-end mt-5">
          <Link to={`/refeicao/${id}/edicao`} className="btn btn-primary">Editar</Link>
        </Col>
      </Row>
    </ContainerApp>
  );
}
