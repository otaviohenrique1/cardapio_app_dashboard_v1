// import { useState } from "react";
import { Alert, Button, ButtonGroup, Col, InputGroup, Row } from "reactstrap";
import { Titulo } from "../../components/Titulo";
import { ContainerApp } from "../../components/ContainerApp";
import { Botao } from "../../components/Botoes/Botao";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

interface FormTesteUploadImagemTypes {
  imagens: File[];
}

const valoresIniciaisTesteUploadImagem: FormTesteUploadImagemTypes = {
  imagens: []
};

const validationSchemaTesteUploadImagem = Yup.object().shape({
  imagens: Yup.mixed().required("Lista vazia")
  /* imagens: Yup.array().of(Yup.object().required("Lista vazia")) */
});

export function TesteUploadImagem() {
  // const [data, setData] = useState<FormTesteUploadImagemTypes>(valoresIniciaisTesteUploadImagem);
  // const [imagensVisualizacao, setImagensVisualizacao] = useState([]);

  async function handleSubmit(values: FormTesteUploadImagemTypes) {
    const { imagens } = values;
    imagens.forEach((item, index) => {
      console.log(`${index}-${item.name}-${item.size}-${item.type}-${item}`);
    });
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Teste Upload Imagem</Titulo>
        </Col>
        <Col md={12}>
          <Formik
            initialValues={valoresIniciaisTesteUploadImagem}
            validationSchema={validationSchemaTesteUploadImagem}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => {
              const { imagens } = values;
              return (
                <Form encType="multipart/form-data">
                  <Row>
                    <Col md={12}>
                      <FieldArray
                        name="imagens"
                        render={({ remove, push }) => (
                          <div>
                            {imagens.map((imagem, index) => (
                              <div key={index}>
                                <InputGroup>
                                  <Field
                                    value={imagem}
                                    type="file"
                                    placeholder="Imagem"
                                    name={`imagens.${index}`}
                                    className="form-control"
                                  />
                                  <Button
                                    type="button"
                                    color="danger"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </Button>
                                </InputGroup>
                                <ErrorMessage
                                  name={`imagens.${index}`}
                                  component="span"
                                  className="alert alert-danger"
                                />
                              </div>
                            ))}
                            <Button
                              color="info"
                              type="button"
                              onClick={() => push('')}
                            >
                              Adicionar imagem
                            </Button>
                          </div>
                        )}
                      />
                    </Col>
                    <Col md={12}>
                      {errors.imagens && touched.imagens ? (<Alert color="danger">{errors.imagens}</Alert>) : null}
                    </Col>
                    <Col md={12} className="d-flex justify-content-end pt-3">
                      <ButtonGroup>
                        <Botao type="submit" color="primary">Salvar</Botao>
                        <Botao type="reset" color="danger">Limpar</Botao>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </ContainerApp>
  );
}
