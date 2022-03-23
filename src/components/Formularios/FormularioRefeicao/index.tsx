import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { To } from "react-router-dom";
import { ButtonGroup, Col, InputGroup, Row } from "reactstrap";
import { Botao, BotaoLink } from "../../Botoes";
import { CampoCheckbox, CampoInput } from "../../Campos";
import { Titulo } from "../../Titulo";

interface FormularioRefeicaoProps {
  initialValues: FormularioRefeicaoTypes;
  validationSchema: any;
  onSubmit: (values: FormularioRefeicaoTypes, helpers: FormikHelpers<FormularioRefeicaoTypes>) => Promise<void>;
  voltarLink: To;
  enableReinitialize: boolean;
}

export function FormularioRefeicao(props: FormularioRefeicaoProps) {
  return (
    <Col md={12}>
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.onSubmit}
        enableReinitialize={props.enableReinitialize}
      >
        {({ errors, touched, values }) => (
          <Form encType="multipart/form-data">
            <Row>
              <CampoInput
                md={12}
                id="nome"
                label="Nome da refeição"
                name="nome"
                type="text"
                placeholder="Digite o nome da refeição"
                value={values.nome}
                error={errors.nome}
                touched={touched.nome}
              />
              <CampoInput
                md={12}
                id="preco"
                label="Preço da refeição"
                name="preco"
                type="number"
                placeholder="Digite o preco da refeição"
                value={`${values.preco}`}
                error={errors.preco}
                touched={touched.preco}
              />
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
                      {values.ingredientes.length > 0 &&
                        values.ingredientes.map((ingrediente, index) => (
                          <Col md={6} key={index} className="p-2">
                            <Row>
                              <Col md={12}>
                                <InputGroup>
                                  <Field
                                    name={`ingredientes.${index}.nome`}
                                    placeholder="Ingrediente"
                                    type="text"
                                    className="form-control"
                                  />
                                  <Botao
                                    type="button"
                                    color="danger"
                                    className="d-flex justify-content-center align-items-center"
                                    onClick={() => remove(index)}
                                  >
                                    <AiOutlineClose size={20} />
                                  </Botao>
                                </InputGroup>
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
                        ))}
                    </Row>
                  )}
                </FieldArray>
              </Col>
              <CampoCheckbox name="ativo" checked={(values.ativo) ? true : false}>Ativo</CampoCheckbox>
              <Col md={12} className="d-flex justify-content-end pt-3">
                <Field type="file"/>
              </Col>
              <Col md={12} className="d-flex justify-content-end pt-3">
                <ButtonGroup>
                  <Botao type="submit" color="primary">Salvar</Botao>
                  <Botao type="reset" color="danger">Limpar</Botao>
                  <BotaoLink to={props.voltarLink} color="info">Voltar</BotaoLink>
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  );
}