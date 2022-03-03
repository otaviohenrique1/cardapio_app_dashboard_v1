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

const SwalModal = withReactContent(Swal);

export function UsuarioCadastro() {
  const navigate = useNavigate();

  async function onSubmit(values: FormularioUsuarioTypes, helpers: FormikHelpers<FormularioUsuarioTypes>) {
    await api.post('usuario', {
      'nome': values.nome,
      'email': values.email,
      'senha': values.senha,
      'data_cadastro': format(new Date(), 'yyyy-MM-dd')
    }).then(() => {
      SwalModal.fire({
        title: "Cadastro realizado com sucesso!",
        buttonsStyling: false,
        confirmButtonText: 'Fechar',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
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