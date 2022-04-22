import { ErrorMessage, Field, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { Col, Row } from "reactstrap";
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
        {({ insert, remove, push }) => (
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
                  <Col md={6} key={index} className="p-2">
                    <Row>
                      <Col md={9} className="me-0 pe-0">
                        <div className="d-flex flex-column">
                          <Field
                            name={`ingredientes.${index}.nome`}
                            placeholder="Nome"
                            type="text"
                            value={nome}
                            className="form-control"
                            style={{
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                              borderBottomLeftRadius: 0,
                            }}
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
                            style={{
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                              borderTopLeftRadius: 0,
                            }}
                          />
                          <ErrorMessage
                            name={`ingredientes.${index}.quantidade`}
                            component="span"
                            className="text-danger"
                          />
                        </div>
                      </Col>
                      <Col md={3} className="ms-0 ps-0">
                        <Botao
                          type="button"
                          color="danger"
                          className="d-flex justify-content-center align-items-center h-100"
                          onClick={() => remove(index)}
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0
                          }}
                        >
                          <AiOutlineClose size={20} />
                        </Botao>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
          </Row>
        )}
      </FieldArray>
    </Col>
  );
}
