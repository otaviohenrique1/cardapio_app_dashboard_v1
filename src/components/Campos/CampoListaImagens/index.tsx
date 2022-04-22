import { Card, CardBody, CardHeader, CardImg, CardText, Col } from "reactstrap";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { ModalConfirmacao, ModalImagem } from "../../Modals";

interface CampoListaImagensProps {
  data: FotoTypes[];
}

export function CampoListaImagens(props: CampoListaImagensProps) {
  const { data } = props;

  return (
    <Col md={12} className="d-flex flex-row justify-content-center">
      {data.map((item, index) => {
        const { id, url } = item;

        return (
          <CardEstilizado
            key={index}
            className="ms-2 me-2"
          >
            <CardHeader className="d-flex flex-row justify-content-between">
              <CardText className="fw-bold mb-0">ID:</CardText>
              <CardText className="mb-0">{id}</CardText>
            </CardHeader>
            <CardBody className="d-flex justify-content-center">
              <CardImg
                src={url}
                alt={`Imagem-${id}-${index}`}
                style={{ height: '100px', width: '100px' }}
                onClick={() => {
                  ModalImagem({
                    image_url: url,
                    image_alt: `Imagem-${id}-${index}`,
                    image_height: '300px'
                  });
                }}
              />
            </CardBody>
              <CardBotaoRemoverEstilizado
                color="danger"
                className="w-100"
                onClick={() => {
                  ModalConfirmacao("warning", "Aviso", "Deseja remover imagem?")
                    .then(() => {
                      // logica do remover imagem do servidor
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >Remover</CardBotaoRemoverEstilizado>
          </CardEstilizado>
        );
      })}
    </Col>
  );
}

const CardBotaoRemoverEstilizado = styled(Botao)`
  border-Top-right-radius: 0 !important;
  border-Top-left-radius: 0 !important;
`;

const CardEstilizado = styled(Card)`
  width: 150px !important;
`;

/*
import { Col, Table } from "reactstrap";
import { Botao } from "../../Botoes/Botao";
import { ModalConfirmacao } from "../../Modals";

interface CampoListaImagensProps {
  data: FotoTypes[];
}

export function CampoListaImagens(props: CampoListaImagensProps) {
  const { data } = props;

  return (
    <Col md={12}>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const { id, url } = item;

            return (
              <tr key={index}>
                <td>{id}</td>
                <td>
                  <img
                    src={url}
                    alt={`Imagem-${id}-${index}`}
                    style={{
                      height: '100px'
                    }}
                  />
                </td>
                <td>
                  <Botao
                    color="danger"
                    onClick={() => {
                      ModalConfirmacao("warning", "Aviso", "Deseja remover imagem?")
                        .then(() => {
                          // logica do remover imagem do servidor
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                  >Remover</Botao>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
}
*/
