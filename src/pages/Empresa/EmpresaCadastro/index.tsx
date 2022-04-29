import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { FormikHelpers } from "formik";
import { Titulo } from "../../../components/Titulo";
import { FormularioEmpresa } from "../../../components/Formularios/FormularioEmpresa";
import { ModalErroCadastro, ModalSucessoCadastro } from "../../../components/Modals";
import { ApiCadastroEmpresa, /*ApiCadastroEmpresaTypes*/ } from "../../../utils/api";
import { FORMATO_DATA_COM_HORA_3, valoresIniciaisFormularioUsuario } from "../../../utils/constantes";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { FormatadorCrypto } from "../../../utils/FormatadorCrypto";
import { validacaoSchemaFormularioUsuario } from "../../../utils/ValidacaoSchemas";

export function EmpresaCadastro() {
  const navigate = useNavigate();

  async function onSubmit(values: UsuarioTypes, helpers: FormikHelpers<UsuarioTypes>) {
    const { nome, email, senha } = values;

    // const data: ApiCadastroEmpresaTypes = {
    //   'nome': nome,
    //   'email': email,
    //   'senha': FormatadorCrypto.mensagemSHA512(senha),
    //   'data_cadastro': FormatadorDados.GeradorDataHoraFormatada(FORMATO_DATA_COM_HORA_3),
    //   'data_modificacao_cadastro': FormatadorDados.GeradorDataHoraFormatada(FORMATO_DATA_COM_HORA_3),
    // };

    // await api.post('usuario', data)
    await ApiCadastroEmpresa({
      'nome': nome,
      'email': email,
      'senha': FormatadorCrypto.mensagemSHA512(senha),
      'data_cadastro': FormatadorDados.GeradorDataHoraFormatada(FORMATO_DATA_COM_HORA_3),
      'data_modificacao_cadastro': FormatadorDados.GeradorDataHoraFormatada(FORMATO_DATA_COM_HORA_3),
    })
      .then(() => {
        ModalSucessoCadastro();
        helpers.resetForm();
        navigate('/');
      })
      .catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }

  return (
    <Container className="pt-5">
      <Row>
        <Col md={12}>
          <Titulo tag="h1">Novo Usuário</Titulo>
        </Col>
        <FormularioEmpresa
          initialValues={valoresIniciaisFormularioUsuario}
          validationSchema={validacaoSchemaFormularioUsuario}
          onSubmit={onSubmit}
          enableReinitialize={false}
          voltarLink="/"
          exibe_senha_antiga={false}
          senha_antiga={""}
        />
      </Row>
    </Container>
  );
}