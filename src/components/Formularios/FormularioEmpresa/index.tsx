import { Form, Formik, FormikHelpers } from "formik";
import { To } from "react-router-dom";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Botao } from "../../Botoes/Botao";
import { BotaoLink } from "../../Botoes/BotaoLink";
import { CampoInput, CampoInputProps } from "../../Campos/CampoInput";
import { CampoSenhaAntiga } from "../../Campos/CampoSenhaAntiga";

interface FormularioEmpresaProps {
  initialValues: UsuarioTypes;
  validationSchema: any;
  onSubmit: (values: UsuarioTypes, helpers: FormikHelpers<UsuarioTypes>) => Promise<void>;
  voltarLink: To;
  enableReinitialize: boolean;
  exibe_senha_antiga: boolean;
  senha_antiga: string;
}

export function FormularioEmpresa(props: FormularioEmpresaProps) {
  const { initialValues, validationSchema, onSubmit, enableReinitialize, voltarLink, exibe_senha_antiga, senha_antiga } = props;

  return (
    <Col md={12}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
      >
        {(formik_props) => {
          const { errors, touched, values } = formik_props;

          const lista_campos_dados: CampoInputProps[] = [
            {
              md: 12, id: "nome", label: "Nome", name: "Nome", type: "text", placeholder: "Digite o nome",
              value: values.nome, error: errors.nome, touched: touched.nome
            },
            {
              md: 12, id: "email", label: "E-mail", name: "E-mail", type: "email", placeholder: "Digite o e-mail",
              value: values.email, error: errors.email, touched: touched.email
            },
            {
              md: 12, id: "senha", label: "Senha", name: "Senha", type: "password", placeholder: "Digite a senha",
              value: values.senha, error: errors.senha, touched: touched.senha
            },
            {
              md: 12, type: "password", id: "confirmacao_senha", name: "confirmacao_senha", label: "Confirme a senha",
              placeholder: "Digite novamente a sua senha", value: values.confirmacao_senha,
              error: errors.confirmacao_senha, touched: touched.confirmacao_senha
            }
          ];

          return (
            <Form>
              <Row>
                {lista_campos_dados.map((item, index) => {
                  const { md, id, label, name, type, placeholder, value, error, touched } = item;

                  return (
                    <CampoInput
                      key={index}
                      md={md}
                      id={id}
                      label={label}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={value}
                      error={error}
                      touched={touched}
                    />
                  );
                })}
                {(exibe_senha_antiga) ? (
                  <CampoSenhaAntiga senha_antiga={senha_antiga} />
                ) : null}
                <Col md={12} className="d-flex justify-content-end mt-5">
                  <ButtonGroup>
                    <Botao type="submit" color="primary">Salvar</Botao>
                    <Botao type="reset" color="danger">Limpar</Botao>
                    <BotaoLink to={voltarLink} color="info">Voltar</BotaoLink>
                  </ButtonGroup>
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </Col>
  );
}

/*
import { Form, Formik, FormikHelpers } from "formik";
import { To } from "react-router-dom";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Botao } from "../../Botoes/Botao";
import { BotaoLink } from "../../Botoes/BotaoLink";
import { CampoInput } from "../../Campos/CampoInput";
import { CampoSenhaAntiga } from "../../Campos/CampoSenhaAntiga";

interface FormularioEmpresaProps {
  initialValues: UsuarioTypes;
  validationSchema: any;
  onSubmit: (values: UsuarioTypes, helpers: FormikHelpers<UsuarioTypes>) => Promise<void>;
  voltarLink: To;
  enableReinitialize: boolean;
  exibe_senha_antiga: boolean;
  senha_antiga: string;
}

export function FormularioEmpresa(props: FormularioEmpresaProps) {
  const { initialValues, validationSchema, onSubmit, enableReinitialize, voltarLink, exibe_senha_antiga, senha_antiga } = props;

  return (
    <Col md={12}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
      >
        {(formik_props) => {
          const { errors, touched, values } = formik_props;
          const { nome: values_nome, email: values_email, senha: values_senha } = values;
          const { nome: errors_nome, email: errors_email, senha: errors_senha } = errors;
          const { nome: touched_nome, email: touched_email, senha: touched_senha } = touched;

          return (
            <Form>
              <Row>
                <CampoInput
                  md={12}
                  id="nome"
                  label="Nome"
                  name="nome"
                  type="text"
                  placeholder="Digite o nome"
                  value={values_nome}
                  error={errors_nome}
                  touched={touched_nome}
                />
                <CampoInput
                  md={12}
                  id="email"
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="Digite o e-mail"
                  value={values_email}
                  error={errors_email}
                  touched={touched_email}
                />
                {(exibe_senha_antiga) ? (
                  <CampoSenhaAntiga senha_antiga={senha_antiga}/>
                ) : null}
                <CampoInput
                  md={12}
                  id="senha"
                  label="Senha"
                  name="senha"
                  type="password"
                  placeholder="Digite a senha"
                  value={values_senha}
                  error={errors_senha}
                  touched={touched_senha}
                />
                <Col md={12} className="d-flex justify-content-end mt-5">
                  <ButtonGroup>
                    <Botao type="submit" color="primary">Salvar</Botao>
                    <Botao type="reset" color="danger">Limpar</Botao>
                    <BotaoLink to={voltarLink} color="info">Voltar</BotaoLink>
                  </ButtonGroup>
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </Col>
  );
}
*/
