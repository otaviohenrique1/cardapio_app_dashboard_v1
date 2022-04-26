import { FieldArray } from "formik";
import { Card, CardBody, CardHeader, CardImg, CardText, Col } from "reactstrap";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { ModalImagem } from "../../Modals";
interface CampoListaFotosProps {
  imagens_antigas: FotoTypes[];
}

export function CampoListaFotos(props: CampoListaFotosProps) {
  const { imagens_antigas } = props;

  return (
    <Col md={12} className=" d-flex flex-row justify-content-center pb-3 mb-3 border-dark border-bottom">
      <FieldArray name="imagens_antigas">
        {({ remove }) => (
          <>
            {imagens_antigas.length > 0 &&
              imagens_antigas.map((imagem_antiga, index) => {
                const { id, url, nome } = imagem_antiga;

                return (
                  <CardEstilizado key={index}
                    className={`${(imagens_antigas.length === 2 && index === 1)
                        ? "ms-2"
                        : (imagens_antigas.length === 3 && index === 1)
                          ? "ms-2 me-2"
                          : "ms-0 me-0"
                      }`}
                  >
                    <CardHeader className="d-flex flex-row justify-content-between">
                      <CardText className="fw-bold mb-0">ID:</CardText>
                      <CardText className="mb-0">{id}</CardText>
                    </CardHeader>
                    <CardBody className="d-flex justify-content-center">
                      <CardImgEstilizado
                        src={`${url}${nome}`}
                        alt={`Imagem-${id}-${index}`}
                        onClick={() => {
                          ModalImagem({
                            image_url: `${url}${nome}`,
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
                      onClick={() => remove(index)}
                    >Remover</CardBotaoRemoverEstilizado>
                  </CardEstilizado>
                );
              })}
          </>
        )}
      </FieldArray>
    </Col>
  );
}

const CardBotaoRemoverEstilizado = styled(Botao)`
  border-Top-right-radius: 0 !important;
  border-Top-left-radius: 0 !important;
`;

const CardImgEstilizado = styled(CardImg)`
  height: 100px !important;
  width: 100px !important;
`;

const CardEstilizado = styled(Card)`
  width: 150px !important;

`;
