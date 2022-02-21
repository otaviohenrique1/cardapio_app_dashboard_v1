import { Form, Formik, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, Container, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import * as Yup from "yup";
import { CampoFormularioCadastro } from "../../../components/Campos";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { format } from "date-fns";

interface FormTypes {
  nome: string;
  email: string;
  senha: string;
}

const valoresIniciais: FormTypes = {
  nome: "",
  email: "",
  senha: "",
};

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  email: Yup.string().email("E-mail invalido").required("Campo vazio"),
  senha: Yup.string().min(8, "Minimo 8 carateres").max(64, 'Maximo 64 carateres').required("Campo vazio"),
});

export function UsuarioCadastro() {
  const navigate = useNavigate();

  async function onSubmit(values: FormTypes, helpers: FormikHelpers<FormTypes>) {
    // let nome = values.nome;
    // let email = values.email;
    // let senha = values.senha;
    // let data_cadastro = format(new Date(), 'yyyy-MM-dd');
    // const data = new FormData();
    // data.append('nome', nome);
    // data.append('email', email);
    // data.append('senha', senha);
    // data.append('data_cadastro', data_cadastro);
    // await api.post('usuario', data);

    await api.post('usuario', {
      'nome': values.nome,
      'email': values.email,
      'senha': values.senha,
      'data_cadastro': format(new Date(), 'yyyy-MM-dd')
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <Container className="pt-5">
      <Row>
        <Col md={12}>
          <Titulo tag="h1">Novo Usuário</Titulo>
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
                  <Col md={12} className="d-flex justify-content-end mt-3">
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