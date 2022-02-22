import { Field, Form, Formik, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, Label, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import * as Yup from "yup";
import { CampoFormularioCadastro } from "../../../components/Campos";
import { ContainerApp } from "../../../components/ContainerApp";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { format } from "date-fns";

interface FormTypes {
  nome: string;
  preco: number;
  ingredientes: string; // Colocar como array de string
  ativo: boolean;
}

const valoresIniciais: FormTypes = {
  nome: "",
  preco: 0,
  ingredientes: "",
  ativo: false
};

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required(),
  preco: Yup.number().required(),
  ingredientes: Yup.string().required(),
});

export function RefeicaoCadastro() {
  async function handleSubmit(values: FormTypes, helpers: FormikHelpers<FormTypes>) {
    await api.post('refeicao', {
      'nome': values.nome,
      'preco': values.preco,
      'ingredientes': values.ingredientes,
      'ativo': values.ativo,
      'id_usuario': (sessionStorage.getItem('id')) ? sessionStorage.getItem('id') : '1',
      'data_cadastro': format(new Date(), 'yyyy-MM-dd')
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
    }).catch((error) => {
      console.error(error);
    });

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
                    <Field className="form-check" type="checkbox" name="ativo" />
                    <Label className="form-label ms-2">Ativo</Label>
                  </Col>
                  <Col md={12} className="d-flex justify-content-end">
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