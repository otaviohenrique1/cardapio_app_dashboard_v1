import { FormikHelpers } from "formik";
import { Col, Container, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { format } from "date-fns";
import { FormularioUsuario } from "../../../components/Formularios/FormularioUsuario";
import { validacaoSchemaFormularioUsuario, valoresIniciaisFormularioUsuario } from "../../../utils/constantes";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sha512 } from "../../../utils/utils";
import { gera_codigo_unico } from "../../../utils/gera_codigo_unico";

const SwalModal = withReactContent(Swal);

export function UsuarioCadastro() {
  const navigate = useNavigate();

  async function onSubmit(values: FormularioUsuarioTypes, helpers: FormikHelpers<FormularioUsuarioTypes>) {
    let nome = values.nome;
    let email = values.email;
    let senha = sha512(values.senha);
    let data_cadastro = format(new Date(), 'yyyy-MM-dd');
    const codigo_unico = gera_codigo_unico();

    await api.post('usuario', {
      'nome': nome,
      'email': email,
      'senha': senha,
      'codigo': codigo_unico,
      'data_cadastro': data_cadastro,
      'data_modificacao_cadastro': data_cadastro,
    }).then(() => {
      SwalModal.fire({
        icon: 'success',
        title: "Cadastro realizado com sucesso!",
        buttonsStyling: false,
        confirmButtonText: 'Fechar',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
      navigate('/');
    }).catch((error) => {
      SwalModal.fire({
        icon: 'error',
        title: 'Erro',
        html: <p>{`${error}`}</p>,
        buttonsStyling: false,
        confirmButtonText: 'Fechar',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
      console.error(error);
    });
  }

  return (
    <Container className="pt-5">
      <Row>
        <Col md={12}>
          <Titulo tag="h1">Novo Usuário</Titulo>
        </Col>
        <FormularioUsuario
          initialValues={valoresIniciaisFormularioUsuario}
          validationSchema={validacaoSchemaFormularioUsuario}
          onSubmit={onSubmit}
          enableReinitialize={false}
          voltarLink="/"
        />
      </Row>
    </Container>
  );
}