import { Field, Form, Formik } from "formik";
import { Button, ButtonGroup, Col, Label, Row } from "reactstrap";
import { CampoFormularioCadastro } from "../../../components/Campos";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required(),
  preco: Yup.number().required(),
  ingredientes: Yup.string().required(),
});

interface FormularioTypes {
  nome: string,
  preco: number,
  ativo: boolean,
  ingredientes: string,
}

export function RefeicaoEdicao() {
  const [data, setData] = useState<FormularioTypes>({ nome: '', preco: 0, ativo: false, ingredientes: '' });
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`refeicao/${id}`)
      .then((item) => {
        if (!id) {
          return;
        }

        let nome = item.data.nome;
        let preco = item.data.preco;
        let ativo = item.data.ativo;
        let ingredientes = item.data.ingredientes;

        setData({ nome, preco, ativo, ingredientes });
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, [id]);

  const valoresIniciaisFormulario: FormularioTypes = {
    nome: data.nome,
    preco: data.preco,
    ativo: data.ativo,
    ingredientes: data.ingredientes,
  };

  async function handleSubmit(values: FormularioTypes) {
    await api.put(`refeicao/${id}`, {
      'nome': values.nome,
      'preco': (values.preco).toString(),
      'ingredientes': values.ingredientes,
      'ativo': values.ativo,
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
            initialValues={valoresIniciaisFormulario}
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
                  <CampoFormularioCadastro
                    md={12}
                    id="ingredientes"
                    label="Ingredientes da refeição"
                    name="ingredientes"
                    type="text"
                    placeholder="Digite o ingredientes da refeição"
                    value={values.ingredientes}
                    error={errors.ingredientes}
                    touched={touched.ingredientes}
                  />
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
                      <Button type="reset" color="danger">Limpar</Button>
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
