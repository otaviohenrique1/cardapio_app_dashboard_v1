import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import { lista_teste_refeicoes } from "../../../utils/listas";
import { FormataValorMonetarioTexto } from "../../../utils/utils";

interface FormTypes {
  nome: string;
  preco: string;
  ativo: string;
}

const valoresIniciais: FormTypes = {
  nome: "",
  preco: "",
  ativo: ""
};

export function RefeicaoDados() {
  const [data, setData] = useState<FormTypes>(valoresIniciais);
  const [abreEdicao, setAbreEdicao] = useState<boolean>(false);
  let { id } = useParams();

  useEffect(() => {
    let buscaItem = lista_teste_refeicoes.find((item) => {
      if (!id) {
        return 0;
      }
      return item.id === parseInt(id)
    });

    if (!buscaItem) {
      return;
    }

    setData({
      nome: buscaItem.nome,
      preco: FormataValorMonetarioTexto(buscaItem.preco),
      ativo: buscaItem.ativo
    });

    console.log(abreEdicao);
    
  }, [abreEdicao, id]);

  const abreTelaEdicao = () => {
    setAbreEdicao(!abreEdicao);
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Dados</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ListGroupItem>
              <Titulo tag="h5" className="w-100 text-center">{data.nome}</Titulo>
            </ListGroupItem>
            <ListGroupItem>
              <Titulo tag="h5" className="w-100 text-center">{data.preco}</Titulo>
            </ListGroupItem>
            <ListGroupItem>
              <Titulo tag="h5" className="w-100 text-center">{data.ativo}</Titulo>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={12}>
          <Button type="button" color="primary" onClick={abreTelaEdicao}>Editar</Button>
        </Col>
      </Row>
      
    </ContainerApp>
  );
}