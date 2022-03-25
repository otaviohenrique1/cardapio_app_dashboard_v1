import { FormikHelpers } from "formik";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import api from "../../../utils/api";
import { format } from "date-fns";
import { validacaoSchemaFormularioRefeicao, valoresIniciaisFormularioRefeicao } from "../../../utils/constantes";
import { FormularioRefeicao } from "../../../components/Formularios/FormularioRefeicao";
import { gera_codigo_unico } from "../../../utils/gera_codigo_unico";
import { ModalConfirmacaoCadastro, ModalErroCadastro } from "../../../components/Modals";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const SwalModal = withReactContent(Swal);

export function RefeicaoCadastro() {
  async function handleSubmit(values: FormularioRefeicaoTypes, helpers: FormikHelpers<FormularioRefeicaoTypes>) {
    const data = new FormData();

    data.append('nome', values.nome);
    data.append('preco', String(values.preco));
    data.append('ingredientes', JSON.stringify(values.ingredientes));
    data.append('ativo', String(values.ativo));
    data.append('descricao', values.descricao);
    data.append('data_cadastro', format(new Date(), 'yyyy-MM-dd'));
    data.append('data_modificacao_cadastro', format(new Date(), 'yyyy-MM-dd'));
    data.append('codigo', gera_codigo_unico());
    values.imagens.forEach(imagem => {
      data.append('images', imagem);
    });
    
    await api.post('refeicao', data).then(() => {
      ModalConfirmacaoCadastro();
    }).catch((error) => {
      console.error(error);
      ModalErroCadastro(error);
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

/*
import { FormikHelpers } from "formik";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import api from "../../../utils/api";
import { format } from "date-fns";
import { validacaoSchemaFormularioRefeicao, valoresIniciaisFormularioRefeicao } from "../../../utils/constantes";
import { FormularioRefeicao } from "../../../components/Formularios/FormularioRefeicao";
import { gera_codigo_unico } from "../../../utils/gera_codigo_unico";
import { ModalConfirmacaoCadastro, ModalErroCadastro } from "../../../components/Modals";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const SwalModal = withReactContent(Swal);

export function RefeicaoCadastro() {
  async function handleSubmit(values: FormularioRefeicaoTypes, helpers: FormikHelpers<FormularioRefeicaoTypes>) {
    const nome = values.nome;
    const preco = values.preco;
    const ingredientes = JSON.stringify(values.ingredientes);
    const ativo = values.ativo;
    const descricao = values.descricao;
    // const idUsuario = (sessionStorage.getItem('id')) ? sessionStorage.getItem('id') : '1';
    const data_cadastro = format(new Date(), 'yyyy-MM-dd');
    const imagens = values.imagens.map(imagem => ({
      fileName: imagem.name,
      type: imagem.type,
      size: `${imagem.size} bytes`
    }));
    const codigo_unico = gera_codigo_unico();
    
    await api.post('refeicao', {
      'nome': nome,
      'preco': preco,
      'ingredientes': ingredientes,
      'descricao': descricao,
      'ativo': ativo,
      'codigo': codigo_unico,
      // 'id_usuario': idUsuario,
      'imagens': imagens,
      'data_cadastro': data_cadastro,
      'data_modificacao_cadastro': data_cadastro,
    }).then(() => {
      ModalConfirmacaoCadastro();
    }).catch((error) => {
      console.error(error);
      ModalErroCadastro(error);
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
*/