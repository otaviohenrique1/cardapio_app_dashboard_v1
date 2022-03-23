import { FormikHelpers } from "formik";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import api from "../../../utils/api";
import { format } from "date-fns";
import { validacaoSchemaFormularioRefeicao, valoresIniciaisFormularioRefeicao } from "../../../utils/constantes";
import { FormularioRefeicao } from "../../../components/Formularios/FormularioRefeicao";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { gera_codigo_unico } from "../../../utils/gera_codigo_unico";

const SwalModal = withReactContent(Swal);

export function RefeicaoCadastro() {
  async function handleSubmit(values: FormularioRefeicaoTypes, helpers: FormikHelpers<FormularioRefeicaoTypes>) {
    const nome = values.nome;
    const preco = values.preco;
    const ingredientes = JSON.stringify(values.ingredientes);
    const ativo = values.ativo;
    const idUsuario = (sessionStorage.getItem('id')) ? sessionStorage.getItem('id') : '1';
    const data_cadastro = format(new Date(), 'yyyy-MM-dd');
    const codigo_unico = gera_codigo_unico();

    await api.post('refeicao', {
      'nome': nome,
      'preco': preco,
      'ingredientes': ingredientes,
      'ativo': ativo,
      'id_usuario': idUsuario,
      'data_cadastro': data_cadastro
    }).then(() => {
      SwalModal.fire({
        title: "Cadastro realizado com sucesso!",
        buttonsStyling: false,
        confirmButtonText: 'Fechar',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    }).catch((error) => {
      console.error(error);
    });

    helpers.resetForm();
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1">Refeicao Cadastro</Titulo>
        </Col>
        <FormularioRefeicao
          initialValues={valoresIniciaisFormularioRefeicao}
          validationSchema={validacaoSchemaFormularioRefeicao}
          onSubmit={handleSubmit}
          enableReinitialize={false}
          voltarLink="/home"
        />
      </Row>
    </ContainerApp>
  );
}
