import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { Col, Label, Row } from "reactstrap";
import { ContainerApp } from "../../components/ContainerApp";

const initialValues = {
  ingredientes: [
  ],
};

export function TesteFormularioListaString() {
  return (
    <ContainerApp>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="ingredientes">
              {({ insert, remove, push }) => (
                <div>
                  {values.ingredientes.length > 0 &&
                    values.ingredientes.map((ingrediente, index) => (
                      <Row key={index}>
                        <Col md={12}>
                          <Row>
                            <Col md={12} className="d-flex flex-row justify-content-center align-items-center">
                              <Label htmlFor={`ingredientes.${index}.nome`}>Ingrediente</Label>
                              <Field
                                name={`ingredientes.${index}.nome`}
                                placeholder="Jane Doe"
                                type="text"
                                className="form-control"
                              />
                            </Col>
                            <Col md={12}>
                              <ErrorMessage
                                name={`ingredientes.${index}.nome`}
                                component="div"
                                className="field-error"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md={12}>
                          <button
                            type="button"
                            className="btn btn-close"
                            onClick={() => remove(index)}
                          >
                          </button>
                        </Col>
                      </Row>
                    ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => push({ nome: '' })}
                  >
                    Adicionar ingrediente
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Salvar</button>
          </Form>
        )}
      </Formik>
    </ContainerApp>
  );
}