import { Col, Container, Row, ButtonGroup, Card, CardBody, CardHeader, CardFooter, Alert } from "reactstrap";
import { Titulo } from "../../components/Titulo";
import { Form, Formik } from "formik";
import { CampoInput } from "../../components/Campos/CampoInput";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { adicionaLogin } from "../../features/login/LoginSlice";
import { useDispatch } from "react-redux";
import { Botao, BotaoLink } from "../../components/Botoes";
import { dadosIniciaisFormularioLogin, schemaValidacaoFormularioLogin } from "../../utils/constantes";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sha512 } from "../../utils/utils";
import { useState } from "react";
const SwalModal = withReactContent(Swal);

export function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [erroMensagem, setErroMensagem] = useState<string>('');

  async function onSubmit(values: FormularioLoginTypes) {
    const email = values.email;
    const senha = sha512(values.senha);

    await api.post('usuario/login',
      { email, senha },
      { auth: { username: email, password: senha } }
    ).then((data) => {
      const id = data.data.data_user.id;
      const nome = data.data.data_user.nome;
      dispatch(adicionaLogin({ id, nome }));
      sessionStorage.setItem('id', `${id}`);
      sessionStorage.setItem('nome', `${nome}`);
      navigate('/home');
    }).catch((error) => {
      setErroMensagem(error.response.data.message);
      SwalModal.fire({
        title: "Login inválido",
        html: <p>{error.response.data.message}</p>,
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
                  {(erroMensagem.length !== 0) ? (<Alert color="danger">{erroMensagem}</Alert>) : null}
                  <Col md={12}>
                  </Col>
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
