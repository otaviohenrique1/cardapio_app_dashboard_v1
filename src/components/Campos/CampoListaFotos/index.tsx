import { FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { Card, CardBody, CardHeader, CardImg, CardText, Col, Row } from "reactstrap";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { ModalImagem } from "../../Modals";
import { ModalConfirmacao } from "../../Modals";

interface CampoListaFotosProps {
  imagens_antigas: FotoTypes[];
}

export function CampoListaFotos(props: CampoListaFotosProps) {
  const { imagens_antigas } = props;

  return (
    <Col md={12} className="d-flex justify-content-center pb-3 mb-3 border-dark border-bottom">
      <FieldArray name="imagens_antigas">
        {({ remove }) => (
          <Row>
            {imagens_antigas.length > 0 &&
              imagens_antigas.map((imagem_antiga, index) => {
                const { id, url } = imagem_antiga;

                return (
                  <Col md={3} key={index} className="p-2">
                    <CardEstilizado>
                      <CardHeader className="d-flex flex-row justify-content-between">
                        <CardText className="fw-bold mb-0">ID:</CardText>
                        <CardText className="mb-0">{id}</CardText>
                      </CardHeader>
                      <CardBody className="d-flex justify-content-center">
                        <CardImgEstilizado
                          src={url}
                          alt={`Imagem-${id}-${index}`}
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
                        type="button"
                        color="danger"
                        className="d-flex justify-content-center align-items-center w-100"
                        onClick={() => {
                          ModalConfirmacao("warning", "Aviso", "Deseja remover imagem?")
                            .then(({ isConfirmed }) => {
                              if (isConfirmed) {
                                remove(index);
                              }
                            })
                            .catch((error) => {
                              console.error(error);
                            });
                        }}
                      >
                        Remover <AiOutlineClose size={20} />
                      </CardBotaoRemoverEstilizado>
                    </CardEstilizado>
                  </Col>
                );
              })}
          </Row>
        )}
      </FieldArray>
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

const CardImgEstilizado = styled(CardImg)`
  height: 100px !important;
  width: 100px !important;
`;