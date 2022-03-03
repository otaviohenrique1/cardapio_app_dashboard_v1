import { Col, Container, Row, ButtonGroup, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { Titulo } from "../../components/Titulo";
import { Form, Formik, FormikHelpers } from "formik";
import { CampoInput } from "../../components/Campos";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { adicionaLogin } from "../../features/login/LoginSlice";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Botao, BotaoLink } from "../../components/Botoes";
import { dadosIniciaisFormularioLogin, schemaValidacaoFormularioLogin } from "../../utils/constantes";
const SwalModal = withReactContent(Swal);

export function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(values: FormularioLoginTypes, formikHelpers: FormikHelpers<FormularioLoginTypes>) {
    const email = values.email;
    const senha = values.senha;
    await api.post('usuario/login', { email, senha }, {
      auth: {
        username: email,
        password: values.senha,
      }
    })
      .then((data) => {
        const id = data.data.data_user.id;
        const nome = data.data.data_user.nome;
        dispatch(adicionaLogin({ id, nome }));
        sessionStorage.setItem('id', `${id}`);
        sessionStorage.setItem('nome', `${nome}`);
        navigate('/home');
      })
      .catch((erro) => {
        console.error(erro);

        SwalModal.fire({
          title: "Login inválido",
          buttonsStyling: false,
          confirmButtonText: 'Fechar',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
        });
      });
  }

  return (
    <Container className="d-flex justify-content-center align-content-center m-5">
      <Formik
        initialValues={dadosIniciaisFormularioLogin}
        onSubmit={onSubmit}
        validationSchema={schemaValidacaoFormularioLogin}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Card>
              <CardHeader>
                <Row>
                  <Col md={12} className="d-flex justify-content-center align-items-center">
                    <Titulo tag="h1">Login</Titulo>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <CampoInput
                    md={12}
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    label="E-mail"
                    placeholder="Digite o seu e-mail"
                    error={errors.email}
                    touched={touched.email}
                  />
                  <CampoInput
                    md={12}
                    type="password"
                    id="senha"
                    name="senha"
                    value={values.senha}
                    label="Senha"
                    placeholder="Digite a sua senha"
                    error={errors.senha}
                    touched={touched.senha}
                  />
                </Row>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col md={12} className="w-100 d-flex justify-content-end">
                    <ButtonGroup>
                      <Botao color="primary" type="submit">Entrar</Botao>
                      <Botao color="danger" type="reset">Limpar</Botao>
                      <BotaoLink to="/usuario/cadastro" color="success">Novo usuario</BotaoLink>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
