import { Form, Formik, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, Container, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import * as Yup from "yup";
import { CampoFormularioCadastro } from "../../../components/Campos";
import { Link } from "react-router-dom";

interface FormTypes {
  nome: string;
  email: string;
  senha: string;
  confirmar_senha: string;
}

const valoresIniciais: FormTypes = {
  nome: "",
  email: "",
  senha: "",
  confirmar_senha: "",
};

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  email: Yup.string().email("E-mail invalido").required("Campo vazio"),
  senha: Yup.string().min(8, "Minimo 8 carateres").required("Campo vazio"),
  confirmar_senha: Yup.string().required("Campo vazio"),
});

export function UsuarioCadastro() {
  function onSubmit(values: FormTypes, helpers: FormikHelpers<FormTypes>) {
    let nome = values.nome;
    let email = values.email;
    let senha = values.senha;
    let confirmar_senha = values.confirmar_senha;

    if (senha !== confirmar_senha) {
      helpers.setFieldError("confirmar_senha", "senhas não correspondem");
      return;
    }

    let data= { nome, email, senha };

    console.log(data);
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Titulo tag="h1">RefeicaoCadastro</Titulo>
        </Col>
        <Col md={12}>
          <Formik
            initialValues={valoresIniciais}
            validationSchema={validacaoSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values }) => (
              <Form>
                <Row>
                  <CampoFormularioCadastro
                    md={12}
                    id="nome"
                    label="Nome"
                    name="nome"
                    type="text"
                    placeholder="Digite o seu nome"
                    value={values.nome}
                    error={errors.nome}
                    touched={touched.nome}
                  />
                  <CampoFormularioCadastro
                    md={12}
                    id="email"
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="Digite o seu e-mail"
                    value={`${values.email}`}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <CampoFormularioCadastro
                    md={12}
                    id="senha"
                    label="Senha"
                    name="senha"
                    type="password"
                    placeholder="Digite a sua senha"
                    value={values.senha}
                    error={errors.senha}
                    touched={touched.senha}
                  />
                  <CampoFormularioCadastro
                    md={12}
                    id="confirmar_senha"
                    label="Confirme a sua senha"
                    name="confirmar_senha"
                    type="password"
                    placeholder="Confirme a sua senha"
                    value={values.confirmar_senha}
                    error={errors.confirmar_senha}
                  />
                  <Col md={12} className="d-flex justify-content-end">
                    <ButtonGroup>
                      <Button type="submit" color="primary">Salvar</Button>
                      <Button type="reset" color="danger">Limpar</Button>
                      <Link to="/" className="btn btn-success">Voltar</Link>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}