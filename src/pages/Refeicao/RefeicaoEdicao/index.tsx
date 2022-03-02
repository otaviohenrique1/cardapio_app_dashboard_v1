import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { Button, ButtonGroup, Col, InputGroup, Label, Row } from "reactstrap";
import { CampoFormularioCadastro } from "../../../components/Campos";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";
import { AiOutlineClose } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required("Campo nome vazio"),
  preco: Yup.number().moreThan(0, "Campo preco vazio").required("Campo preco vazio"),
  ingredientes: Yup.array().of(
    Yup.object().shape({
      nome: Yup.string().required("Campo nome do ingrediente vazio")
    })
  )
    .min(1, 'Minimo 1 ingrediente')
    .required("Campo ingredientes vazio")
});

interface FormularioTypes {
  nome: string;
  preco: number;
  ativo: boolean;
  ingredientes: { nome: string }[];
}

const valoresIniciaisUseState: FormularioTypes = {
  nome: '',
  preco: 0,
  ativo: false,
  ingredientes: []
};

export function RefeicaoEdicao() {
  const [data, setData] = useState<FormularioTypes>(valoresIniciaisUseState);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`refeicao/${id}`)
      .then((item) => {
        const nome = item.data.nome;
        const preco = item.data.preco;
        const ativo = item.data.ativo;
        const ingredientes = JSON.parse(String(item.data.ingredientes));

        setData({ nome, preco, ativo, ingredientes });
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, [id]);

  const dadosDaRefeicao: FormularioTypes = {
    nome: data.nome,
    preco: data.preco,
    ativo: data.ativo,
    ingredientes: data.ingredientes,
  };

  async function handleSubmit(values: FormularioTypes) {
    const nome = values.nome;
    const preco = values.preco;
    const ingredientes = JSON.stringify(values.ingredientes);
    const ativo = values.ativo;

    await api.put(`refeicao/${id}`, {
      'id': id,
      'nome': nome,
      'preco': preco,
      'ingredientes': ingredientes,
      'ativo': ativo,
    }).then(() => {
      alert('Cadastro alterado com sucesso!');
      navigation(`/refeicao/${id}`);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <Col md={12}>
          <Formik
            initialValues={dadosDaRefeicao}
            validationSchema={validacaoSchema}
            onSubmit={handleSubmit}
            enableReinitialize
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
                  <Col md={12} className="d-flex flex-row pt-3">
                    <Field
                      className="form-check"
                      type="checkbox"
                      name="ativo"
                      checked={(values.ativo) ? true : false}
                    />
                    <Label className="form-label ms-2">Ativo</Label>
                  </Col>
                  <Col md={12} className="d-flex justify-content-end">
                    <ButtonGroup>
                      <Button type="submit" color="primary">Salvar</Button>
                      <Link to={`/refeicao/${id}`} className="btn btn-info">Voltar</Link>
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
