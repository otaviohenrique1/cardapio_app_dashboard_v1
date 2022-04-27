import { ErrorMessage, Field, FieldArray } from "formik";
import { Card, CardBody, Col, Row } from "reactstrap";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { Titulo } from "../../Titulo";

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
                  <span className="me-2">Adicionar ingrediente</span>
                </Botao>
              </Col>
              {(ingredientes.length > 0) ? (
                  ingredientes.map((ingrediente, index) => {
                    const { nome, quantidade } = ingrediente;

                    const ingredientes_nome = `ingredientes.${index}.nome`;
                    const ingredientes_quantidade = `ingredientes.${index}.quantidade`;

                    const campo_ingrediente_dados: CampoIngredienteProps[] = [
                      {
                        name_field: ingredientes_nome,
                        placeholder_field: "Nome",
                        type_field: "text",
                        value_field: nome,
                        name_error_message: ingredientes_nome
                      },
                      {
                        name_field: ingredientes_quantidade,
                        placeholder_field: "Quantidade",
                        type_field: "number",
                        value_field: String(quantidade),
                        name_error_message: ingredientes_quantidade,
                      }
                    ];

                    return (
                      <Col md={3} key={index} className="p-2">
                        <Card>
                          <CardBody className="p-1">
                            {campo_ingrediente_dados.map((item, index) => {
                              const { name_field, placeholder_field, type_field, value_field, name_error_message } = item;
                              return (
                                <CampoIngrediente
                                  key={index}
                                  name_field={name_field}
                                  placeholder_field={placeholder_field}
                                  type_field={type_field}
                                  value_field={value_field}
                                  name_error_message={name_error_message}
                                />
                              );
                            })}
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

interface CampoIngredienteProps {
  name_field: string;
  placeholder_field: string;
  type_field: CampoInputTypes;
  value_field: string;
  name_error_message: string;
}

function CampoIngrediente(props: CampoIngredienteProps) {
  const { name_field, placeholder_field, type_field, value_field, name_error_message } = props;

  return (
    <div className="d-flex flex-column mb-1">
      <Field
        name={name_field}
        placeholder={placeholder_field}
        type={type_field}
        value={value_field}
        className="form-control"
      />
      <ErrorMessage
        name={name_error_message}
        component="span"
        className="text-danger"
      />
    </div>
  );
}

/*
import { ErrorMessage, Field, FieldArray } from "formik";
import { Card, CardBody, Col, Row } from "reactstrap";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { Titulo } from "../../Titulo";

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
                  <span className="me-2">Adicionar ingrediente</span>
                </Botao>
              </Col>
              {ingredientes.length > 0 &&
                ingredientes.map((ingrediente, index) => {
                  const { nome, quantidade } = ingrediente;

                  const ingredientes_nome = `ingredientes.${index}.nome`;
                  const ingredientes_quantidade = `ingredientes.${index}.quantidade`;

                  const campo_ingrediente_dados: CampoIngredienteProps[] = [
                    {
                      name_field: ingredientes_nome,
                      placeholder_field: "Nome",
                      type_field: "text",
                      value_field: nome,
                      name_error_message: ingredientes_nome
                    },
                    {
                      name_field: ingredientes_quantidade,
                      placeholder_field: "Quantidade",
                      type_field: "number",
                      value_field: String(quantidade),
                      name_error_message: ingredientes_quantidade,
                    }
                  ];

                  return (
                    <Col md={3} key={index} className="p-2">
                      <Card>
                        <CardBody className="p-1">
                          {campo_ingrediente_dados.map((item, index) => {
                            const { name_field, placeholder_field, type_field, value_field, name_error_message } = item;
                            return (
                              <CampoIngrediente
                                key={index}
                                name_field={name_field}
                                placeholder_field={placeholder_field}
                                type_field={type_field}
                                value_field={value_field}
                                name_error_message={name_error_message}
                              />
                            );
                          })}
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
                })}
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

interface CampoIngredienteProps {
  name_field: string;
  placeholder_field: string;
  type_field: CampoInputTypes;
  value_field: string;
  name_error_message: string;
}

function CampoIngrediente(props: CampoIngredienteProps) {
  const { name_field, placeholder_field, type_field, value_field, name_error_message } = props;

  return (
    <div className="d-flex flex-column mb-1">
      <Field
        name={name_field}
        placeholder={placeholder_field}
        type={type_field}
        value={value_field}
        className="form-control"
      />
      <ErrorMessage
        name={name_error_message}
        component="span"
        className="text-danger"
      />
    </div>
  );
}
*/

/*
import { ErrorMessage, Field, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { Card, CardBody, Col, Row } from "reactstrap";
import styled from "styled-components";
import { Botao } from "../../Botoes/Botao";
import { Titulo } from "../../Titulo";

interface CampoIngredientesProps {
  ingredientes: IngredientesTypes[];
}

export function CampoIngredientes(props: CampoIngredientesProps) {
  const { ingredientes } = props;

  return (
    <Col md={12} className="d-flex flex-column pt-3 pb-3 mt-3 mb-3 border-dark border-top border-bottom">
      <FieldArray name="ingredientes">
        {({ remove, push }) => (
          <Row>
            <Col md={12} className="d-flex flex-row justify-content-between pb-1">
              <Titulo tag="h6" className="fw-normal">Lista de ingredientes</Titulo>
              <Botao
                type="button"
                color="info"
                onClick={() => push({ nome: '' })}
                className="d-flex flex-row justify-content-center align-items-center"
              >
                <span className="me-2">Adicionar ingrediente</span>
                <GrAddCircle size={25} className="m-0 p-0" />
              </Botao>
            </Col>
            {ingredientes.length > 0 &&
              ingredientes.map((ingrediente, index) => {
                const { nome, quantidade } = ingrediente;

                return (
                  <Col md={3} key={index} className="p-2">
                    <Card>
                      <CardBody className="p-1">
                        <div className="d-flex flex-column mb-1">
                          <Field
                            name={`ingredientes.${index}.nome`}
                            placeholder="Nome"
                            type="text"
                            value={nome}
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`ingredientes.${index}.nome`}
                            component="span"
                            className="text-danger"
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <Field
                            name={`ingredientes.${index}.quantidade`}
                            placeholder="Quantidade"
                            type="number"
                            value={quantidade}
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`ingredientes.${index}.quantidade`}
                            component="span"
                            className="text-danger"
                          />
                        </div>
                      </CardBody>
                      <CardBotaoRemoverEstilizado
                        type="button"
                        color="danger"
                        className="d-flex justify-content-center align-items-center w-100"
                        onClick={() => remove(index)}
                      >
                        <AiOutlineClose size={20} />
                      </CardBotaoRemoverEstilizado>
                    </Card>
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
*/
