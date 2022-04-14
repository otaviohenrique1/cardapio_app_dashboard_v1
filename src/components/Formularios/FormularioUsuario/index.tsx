import { Form, Formik, FormikHelpers } from "formik";
import { To } from "react-router-dom";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Botao } from "../../Botoes/Botao";
import { BotaoLink } from "../../Botoes/BotaoLink";
import { CampoInput } from "../../Campos/CampoInput";

interface FormularioUsuarioProps {
  initialValues: UsuarioTypes;
  validationSchema: any;
  onSubmit: (values: UsuarioTypes, helpers: FormikHelpers<UsuarioTypes>) => Promise<void>;
  voltarLink: To;
  enableReinitialize: boolean;
}

export function FormularioUsuario(props: FormularioUsuarioProps) {
  return (
    <Col md={12}>
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.onSubmit}
        enableReinitialize={props.enableReinitialize}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Row>
              <CampoInput
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
              <CampoInput
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
              <CampoInput
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
                  <Botao type="submit" color="primary">Salvar</Botao>
                  <Botao type="reset" color="danger">Limpar</Botao>
                  <BotaoLink to={props.voltarLink} color="info">Voltar</BotaoLink>
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  );
}