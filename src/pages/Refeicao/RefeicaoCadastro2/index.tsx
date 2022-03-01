import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, InputGroup, Label, Row } from "reactstrap";
// import { Input } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import * as Yup from "yup";
import { CampoFormularioCadastro } from "../../../components/Campos";
import { ContainerApp } from "../../../components/ContainerApp";
import { Link } from "react-router-dom";
// import api from "../../../utils/api";
import { format } from "date-fns";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";

interface FormTypes {
  nome: string;
  preco: number;
  ingredientes: { nome: string; }[]; // Colocar como array de string
  ativo: boolean;
}

const valoresIniciais: FormTypes = {
  nome: "",
  preco: 0,
  ingredientes: [
    {
      nome: ''
    }
  ],
  ativo: false
};

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required("Campo nome vazio"),
  preco: Yup.number().moreThan(0, "Campo preco vazio").required("Campo preco vazio"),
  // preco: Yup.number().not([0], "Campo preco vazio").required("Campo preco vazio"),
  // ingredientes: Yup.array().length(0).required("Campo ingredientes vazio"),
  ingredientes: Yup.array().of(
    Yup.object().shape({
      nome: Yup.string().required("Campo nome do ingrediente vazio")
    })
  )
    .min(1, 'Minimo 1 ingrediente')
    // .length(0, "Lista vazia")
    .required("Campo ingredientes vazio")
});

export function RefeicaoCadastro2() {
  async function handleSubmit(values: FormTypes, helpers: FormikHelpers<FormTypes>) {
    const nome = values.nome;
    const preco = values.preco;
    const ingredientes = values.ingredientes;
    const ativo = values.ativo;
    const idUsuario = (sessionStorage.getItem('id')) ? sessionStorage.getItem('id') : '1';
    const data_cadastro = format(new Date(), 'yyyy-MM-dd');

    console.log(`nome: ${nome}`);
    console.log(`preco: ${preco}`);
    console.log(`ativo: ${ativo}`);
    console.log(`id_usuario: ${idUsuario}`);
    console.log(`data_cadastro: ${data_cadastro}`);
    console.log(`ingredientes1: ${ingredientes.join(';')}`);
    console.log('ingredientes2:');
    for (let i = 0; i < ingredientes.length; i++) {
      console.log(`ingrediente[${i}]: ${ingredientes[i].nome}`);
    }

    // await api.post('refeicao', {
    //   'nome': nome,
    //   'preco': preco,
    //   'ingredientes': ingredientes,
    //   'ativo': ativo,
    //   'id_usuario': idUsuario,
    //   'data_cadastro': data_cadastro
    // }).then(() => {
    //   alert('Cadastro realizado com sucesso!');
    // }).catch((error) => {
    //   console.error(error);
    // });

    helpers.resetForm();
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1">Refeicao Cadastro</Titulo>
        </Col>
        <Col md={12}>
          <Formik
            initialValues={valoresIniciais}
            validationSchema={validacaoSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form>
                <Row>
                  <CampoFormularioCadastro
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
                  <CampoFormularioCadastro
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
                            <Button
                              type="button"
                              color="info"
                              onClick={() => push({ nome: '' })}
                              className="d-flex flex-row justify-content-center align-items-center"
                            >
                              <span className="me-2">Adicionar ingrediente</span>
                              <GrAddCircle size={25} className="m-0 p-0" />
                            </Button>
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
                                      <Button
                                        type="button"
                                        color="danger"
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={() => remove(index)}
                                      >
                                        <AiOutlineClose size={20} />
                                      </Button>
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
                  <Col md={12} className="d-flex flex-row">
                    <Field className="form-check" type="checkbox" name="ativo" />
                    <Label className="form-label ms-2">Ativo</Label>
                  </Col>
                  {/* <Col md={12} className="d-flex flex-column align-items-start pt-3">
                    <Titulo tag="h6" className="mb-2">Imagem</Titulo>
                    <Input type="file" id="imagem" />
                  </Col> */}
                  <Col md={12} className="d-flex justify-content-end pt-3">
                    <ButtonGroup>
                      <Button type="submit" color="primary">Salvar</Button>
                      <Button type="reset" color="danger">Limpar</Button>
                      <Link to="/home" className="btn btn-info">Voltar</Link>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </ContainerApp>
  );
}
