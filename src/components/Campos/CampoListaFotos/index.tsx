import { FieldArray } from "formik";
import { Card, CardBody, CardHeader, CardImg, CardText, Col } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { ModalImagem } from "../../Modals";
import { Titulo } from "../../Titulo";
interface CampoListaFotosProps {
  titulo: string;
  imagens_antigas: FotoTypes[];
  imagens_removidas: FotoTypes[];
  md?: ColumnProps;
  xs?: ColumnProps;
  sm?: ColumnProps;
  lg?: ColumnProps;
  xl?: ColumnProps;
  xxl?: ColumnProps;
}

export function CampoListaFotos(props: CampoListaFotosProps) {
  const { titulo, imagens_antigas, imagens_removidas, md, xs, sm, lg, xl, xxl } = props;

  return (
    <Col
      className="d-flex flex-column pb-3 mb-3 border-dark border-bottom"
      md={md} xs={xs} sm={sm} lg={lg} xl={xl} xxl={xxl}
    >
      <Titulo tag="h5" className="w-100 text-start">{titulo}</Titulo>
      <div className="d-flex flex-row justify-content-center">
        <FieldArray name="imagens_antigas">
          {(field_array) => {
            const { remove } = field_array;

            return (
              <>
                {imagens_antigas.length > 0 &&
                  imagens_antigas.map((imagem_antiga, index) => {
                    const { id, url, nome } = imagem_antiga;

                    /*
                      Valida se o item vai receber um valor no margin:
                        1) Se a lista tem 3 itens e o item tiver na posicao 1:
                        - coloca as classes ms-2 e me-2
                          - ms-2 => coloca valor no margin-left
                          - me-2 => coloca valor no margin-right
                        2) Se a lista tem 2 itens e o item tiver na posicao 1:
                          - coloca classe ms-2
                          - ms-2 => coloca valor no margin-left
                        3) Se a lista tem 1 item:
                          - coloca as classes ms-0 e me-0
                          - ms-0 => coloca valor 0 no margin-left
                          - me-0 => coloca valor 0 no margin-right 
                    */

                    const item_posicao_1 = index === 1;
                    const item_do_meio = imagens_antigas.length === 3;
                    const ultimo_item = imagens_antigas.length === 2;
                    const classe_margin_left = "ms-2";
                    const classe_margin_left_zero = "me-2";
                    const classe_margin_right = "ms-0";
                    const classe_margin_right_zero = "me-0";

                    const valida_se_for_item_do_meio = (item_do_meio && item_posicao_1)
                      ? `${classe_margin_left} ${classe_margin_right}` // "ms-2 me-2"
                      : `${classe_margin_left_zero} ${classe_margin_right_zero}`; // "ms-0 me-0"

                    const valida_se_for_ultimo_item = (ultimo_item && item_posicao_1)
                      ? `${classe_margin_left}` // "ms-2"
                      : valida_se_for_item_do_meio;

                    const valida_classe_margin = `${valida_se_for_ultimo_item}`;

                    const image_url = `${url}${nome}`;
                    const image_alt = `Imagem-${id}-${index}`;
                    const image_height = '300px';

                    return (
                      <CardEstilizado key={index} className={valida_classe_margin}>
                        <CardHeader className="d-flex flex-row justify-content-between">
                          <CardText className="fw-bold mb-0">ID:</CardText>
                          <CardText className="mb-0">{id}</CardText>
                        </CardHeader>
                        <CardBody className="d-flex justify-content-center">
                          <CardImgEstilizado
                            src={image_url}
                            alt={image_alt}
                            onClick={() => {
                              const data_modal = { image_url, image_alt, image_height };
                              ModalImagem(data_modal);
                            }}
                          />
                        </CardBody>
                        <CardBotaoRemoverEstilizado
                          type="button"
                          color="danger"
                          className="d-flex justify-content-center align-items-center w-100"
                          onClick={() => {
                            imagens_removidas.push({ id, nome, url });
                            remove(index)
                          }}
                        >Remover</CardBotaoRemoverEstilizado>
                      </CardEstilizado>
                    );
                  })}
              </>
            );
          }}
        </FieldArray>
      </div>
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
