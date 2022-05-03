import { FieldArray } from "formik";
import { Card, CardBody, Col, Row } from "reactstrap";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { Titulo } from "../../Titulo";
import { CampoListaItem, CampoListaItemProps } from "../CampoListaItem";

interface IngredientesOpcionaisTypes {
  nome: string;
  preco: number;
}

interface CampoIngredienteOpcionalProps {
  ingredientes_opcionais: IngredientesOpcionaisTypes[];
}

export function CampoIngredienteOpcional(props: CampoIngredienteOpcionalProps) {
  const { ingredientes_opcionais } = props;

  return (
    <Col md={12} className="d-flex flex-column pt-3 pb-3 mt-3 mb-3 border-dark border-top border-bottom">
      <FieldArray name="ingredientes_opcionais">
        {(field_array) => {
          const { remove, push } = field_array;

          return (
            <Row>
              <Col md={12} className="d-flex flex-row justify-content-between pb-1">
                <Titulo tag="h6" className="fw-normal">Adicionar opcionais</Titulo>
                <Botao
                  type="button"
                  color="info"
                  onClick={() => push({ nome: '', preco: '' })}
                  className="d-flex flex-row justify-content-center align-items-center"
                >
                  <span className="me-2">Adicionar</span>
                </Botao>
              </Col>
              {(ingredientes_opcionais.length > 0) ? (
                  ingredientes_opcionais.map((ingrediente_opcional, index) => {
                    const { nome, preco } = ingrediente_opcional;

                    const campo_ingrediente_dados: CampoListaItemProps[] = [
                      {
                        name: `ingredientes.${index}.nome`,
                        placeholder: "Nome",
                        type: "text",
                        value: nome,
                        name_messagem_erro: `ingredientes.${index}.nome`
                      },
                      {
                        name: `ingredientes.${index}.preco`,
                        placeholder: "Preço",
                        type: "number",
                        value: String(preco),
                        name_messagem_erro: `ingredientes.${index}.preco`,
                      }
                    ];

                    return (
                      <Col md={3} key={index} className="p-2">
                        <Card>
                          <CardBody className="p-1">
                            <Row className="m-0 p-0">
                              {campo_ingrediente_dados.map((item, index) => {
                                const { name, placeholder, type, value, name_messagem_erro } = item;
                                return (
                                  <Col md={12} key={index}>
                                    <CampoListaItem
                                      name={name}
                                      placeholder={placeholder}
                                      type={type}
                                      value={value}
                                      name_messagem_erro={name_messagem_erro}
                                    />
                                  </Col>
                                );
                              })}
                            </Row>
                          </CardBody>
                          <CardBotaoRemoverEstilizado
                            type="button"
                            color="danger"
                            className="d-flex justify-content-center align-items-center w-100"
                            onClick={() => remove(index)}
                          >Remover</CardBotaoRemoverEstilizado>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <Col md={12}>
                    <Titulo tag="h3">Lista vazia</Titulo>
                  </Col>
                )}
            </Row>
          );
        }}
      </FieldArray>
    </Col>
  );
}

const CardBotaoRemoverEstilizado = styled(Botao)`
  border-Top-right-radius: 0 !important;
  border-Top-left-radius: 0 !important;
`;
