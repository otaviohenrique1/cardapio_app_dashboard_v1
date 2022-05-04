import { ErrorMessage, FieldArray } from "formik";
import { Card, CardBody, Col, Row } from "reactstrap";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { Titulo } from "../../Titulo";
import { CampoCheckbox } from "../CampoCheckbox";
import { lista_unidade_quantidade } from "../../../utils/listas";
import { CampoListaItem } from "../CampoListaItem";
import { CampoSelect, CampoSelectProps } from "../CampoSelect";
import { IoAddCircleOutline } from "react-icons/io5";

interface CampoIngredientesProps {
  ingredientes: IngredientesTypes[];
}

export function CampoIngredientes(props: CampoIngredientesProps) {
  const { ingredientes } = props;

  return (
    <Col md={12} className="d-flex flex-column pt-3 pb-3 mt-3 mb-3 border-dark border-top border-bottom">
      <FieldArray name="ingredientes">
        {(field_array) => {
          const { remove, push } = field_array;

          return (
            <Row>
              <Col md={12} className="d-flex flex-row justify-content-between pb-1">
                <Titulo tag="h6" className="fw-normal">Lista de ingredientes</Titulo>
                <Botao
                  type="button"
                  color="info"
                  onClick={() => push({ nome: '' })}
                  className="d-flex flex-row justify-content-center align-items-center"
                >
                  <span className="me-2">Adicionar ingredientes</span>
                  <IoAddCircleOutline size={10} />
                </Botao>
              </Col>
              {(ingredientes.length > 0) ? (
                ingredientes.map((ingrediente, index) => {
                  const { nome, quantidade, unidade_quantidade, removivel } = ingrediente;
                  return (
                    <Col md={3} key={index} className="p-2">
                      <Card>
                        <CardBody className="p-1">
                          <Row className="m-0 p-0">
                            <Col md={12}>
                              <CampoListaItem
                                id={`ingredientes.${index}.nome`}
                                name={`ingredientes.${index}.nome`}
                                placeholder={"Nome"}
                                type={"text"}
                                value={nome}
                                name_messagem_erro={`ingredientes.${index}.nome`}
                              />
                            </Col>
                            <Col md={6}>
                              <CampoListaItem
                                id={`ingredientes.${index}.quantidade`}
                                name={`ingredientes.${index}.quantidade`}
                                placeholder={"Quantidade"}
                                type={"number"}
                                value={String(quantidade)}
                                name_messagem_erro={`ingredientes.${index}.quantidade`}
                              />
                            </Col>
                            <Col md={6}>
                              <CampoSelectQuantidadeUnidade
                                id={`ingredientes.${index}.quantidade`}
                                name={`ingredientes.${index}.quantidade`}
                                value={unidade_quantidade}
                                placeholder="quantidade"
                                data={lista_unidade_quantidade}
                                name_messagem_erro={`ingredientes.${index}.quantidade`}
                                label_item_vazio="Selecione"
                              />
                            </Col>
                            <Col md={12}>
                              <CampoCheckbox
                                name={`ingredientes.${index}.removivel`}
                                checked={(removivel) ? true : false}
                                label="Removivel"
                              />
                            </Col>
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

interface CampoSelectQuantidadeUnidadeProps extends CampoSelectProps {
  name_messagem_erro: string;
}

function CampoSelectQuantidadeUnidade(props: CampoSelectQuantidadeUnidadeProps) {
  const { id, name, value, placeholder, data, label_item_vazio, name_messagem_erro } = props;

  return (
    <div className="d-flex flex-column mb-1">
      <CampoSelect
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        data={data}
        label_item_vazio={label_item_vazio}
      />
      <ErrorMessage
        name={name_messagem_erro}
        component="span"
        className="text-danger"
      />
    </div>
  );
}
