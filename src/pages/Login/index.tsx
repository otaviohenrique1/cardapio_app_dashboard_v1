import { useNavigate } from "react-router-dom";
import { Col, Container, Row, ButtonGroup, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { Form, Formik } from "formik";
import { Titulo } from "../../components/Titulo";
import { CampoInput, CampoInputProps } from "../../components/Campos/CampoInput";
import { Botao } from "../../components/Botoes/Botao";
import { ModalMensagem } from "../../components/Modals";
import api from "../../utils/api";
import { dadosIniciaisFormularioLogin } from "../../utils/constantes";
import { FormatadorCrypto } from "../../utils/FormatadorCrypto";
import { schemaValidacaoFormularioLogin } from "../../utils/ValidacaoSchemas";

export function Login() {
  let navigate = useNavigate();

  async function onSubmit(values: LoginTypes) {
    const { email, senha } = values;

    let senha_formatada = FormatadorCrypto.mensagemSHA512(senha);

    const data = { email, senha: senha_formatada };

    const auth = {
      auth: {
        username: email,
        password: senha_formatada
      }
    };

    await api.post('usuario/login', data, auth)
      .then((data) => {
        const { id, nome } = data.data.data_user;
        sessionStorage.setItem('id', String(id));
        sessionStorage.setItem('nome', String(nome));
        navigate('/home');
      })
      .catch((error) => {
        ModalMensagem("error", "Erro", "Login inválido");
        console.error(error);
      });
  }

  return (
    <Container className="d-flex justify-content-center align-content-center m-5">
      <Formik
        initialValues={dadosIniciaisFormularioLogin}
        onSubmit={onSubmit}
        validationSchema={schemaValidacaoFormularioLogin}
      >
        {(formik_props) => {
          const { errors, touched, values } = formik_props;

          const lista_campos_dados: CampoInputProps[] = [
            {
              md: 12, type: "text", id: "email", name: "email",
              label: "E-mail", placeholder: "Digite o seu e-mail",
              value: values.email, error: errors.email, touched: touched.email
            },
            {
              md: 12, type: "password", id: "senha", name: "senha", label: "Senha",
              placeholder: "Digite a sua senha", value: values.senha,
              error: errors.senha, touched: touched.senha
            }
          ];

          return (
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
                    {lista_campos_dados.map((item, index) => {
                      const { md, id, label, name, type, placeholder, value, error, touched } = item;
                      return (
                        <CampoInput key={index} md={md} id={id} label={label} name={name} type={type}
                          placeholder={placeholder} value={value} error={error} touched={touched}
                        />
                      );
                    })}
                  </Row>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col md={12} className="w-100 d-flex justify-content-end">
                      <ButtonGroup>
                        <Botao color="primary" type="submit">Entrar</Botao>
                        <Botao color="danger" type="reset">Limpar</Botao>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
