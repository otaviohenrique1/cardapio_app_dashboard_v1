import { Form, Formik } from "formik";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { CampoFormularioCadastro } from "../../../components/Campos";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  email: Yup.string().email("E-mail invalido").required("Campo vazio"),
  senha: Yup.string().min(8, "Minimo 8 carateres").max(64, 'Maximo 64 carateres').required("Campo vazio"),
});

interface FormularioTypes {
  nome: string;
  email: string;
  senha: string;
}

const valoresIniciaisUseState: FormularioTypes = {
  nome: "",
  email: "",
  senha: "",
};

export function UsuarioEdicao() {
  const [data, setData] = useState<FormularioTypes>(valoresIniciaisUseState);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`usuario/${id}`)
      .then((item) => {
        setData({
          nome: item.data.nome,
          email: item.data.email,
          senha: item.data.senha,
        });
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, [id]);

  const dadosDoUsuario: FormularioTypes = {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
  };

  async function handleSubmit(values: FormularioTypes) {
    await api.put(`usuario/${id}`, {
      'id': id,
      'nome': values.nome,
      'email': values.email,
      'senha': values.senha,
    }).then(() => {
      alert('Cadastro alterado com sucesso!');
      navigation(`/usuario/${id}`);
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
            initialValues={dadosDoUsuario}
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
                  <Col md={12} className="d-flex justify-content-end mt-5">
                    <ButtonGroup>
                      <Button type="submit" color="primary">Salvar</Button>
                      <Link to={`/usuario/${id}`} className="btn btn-info">Voltar</Link>
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
