import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
// import { UncontrolledCarousel } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { FormataData, FormataValorMonetarioTexto } from "../../../utils/utils";
import { ItemListaFichaDados } from "../../../components/Lista";
import { MdPlayArrow } from "react-icons/md";
import { BotaoLink } from "../../../components/Botoes";
import { GrImage } from "react-icons/gr";
import { MdOutlineImageNotSupported } from "react-icons/md";

interface RefeicaoDadosTypes {
  id: string;
  nome: string;
  preco: number;
  ativo: boolean;
  ingredientes: { nome: string }[];
  descricao: string;
  codigo: string;
  imagem: File[],
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

const valoresIniciaisRefeicaoDados: RefeicaoDadosTypes = {
  id: "",
  nome: "",
  preco: 0,
  ativo: false,
  ingredientes: [],
  descricao: "",
  codigo: "",
  imagem: [],
  data_cadastro: "",
  data_modificacao_cadastro: "",
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
        const descricao = item.data.descricao;
        const codigo = item.data.codigo;
        const imagem = [...item.data.imagem];
        const data_cadastro = FormataData(item.data.data_cadastro);
        const data_modificacao_cadastro = FormataData(item.data.data_cadastro);

        const data = { id, nome, preco, ativo, ingredientes, descricao, codigo, imagem, data_cadastro, data_modificacao_cadastro };

        setData(data);
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
            <ListGroupItem className="d-flex justify-content-center">
              {(data.imagem.length === 0) ? (
                <MdOutlineImageNotSupported size={100} />
              ) : (
                <GrImage size={100} />
              )}
            </ListGroupItem>
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
              titulo="Descrição"
              valor={data.descricao}
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
            <ListGroupItem className="d-flex flex-column">
              <Titulo tag="h5" className="w-100">Ingredientes</Titulo>
              {data.ingredientes.map((item, index) => {
                return (
                  <div className="d-flex flex-row justify-content-between" key={index}>
                    <MdPlayArrow size={25} className="me-1" />
                    <Titulo tag="h6" className="w-100">{item.nome}</Titulo>
                  </div>
                );
              })}
            </ListGroupItem>
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
          <BotaoLink to={`/refeicao/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}
