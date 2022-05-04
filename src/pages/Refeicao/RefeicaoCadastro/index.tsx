import { useState } from "react";
import { Col, Row } from "reactstrap";
import { FormikHelpers } from "formik";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioRefeicao } from "../../../components/Formularios/FormularioRefeicao";
import { ModalSucessoCadastro, ModalErroCadastro } from "../../../components/Modals";
import { ApiCadastroRefeicao } from "../../../utils/api";
import { FORMATO_DATA_COM_HORA_3, valoresIniciaisFormularioRefeicao } from "../../../utils/constantes";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { validacaoSchemaFormularioRefeicao } from "../../../utils/ValidacaoSchemas";
import { useNavigate } from "react-router-dom";

export function RefeicaoCadastro() {
  const [imagensVisualizacao, setImagensVisualizacao] = useState([]);
  const navigation = useNavigate();

  async function handleSubmit(values: RefeicaoTypes, helpers: FormikHelpers<RefeicaoTypes>) {
    const { nome, preco, ingredientes, ativo, descricao, imagens,
      ingredientes_opcionais, quantidade, unidade_quantidade, tipo_produto } = values;

    const data = new FormData();
    data.append('nome', nome);
    data.append('preco', String(preco));
    data.append('descricao', descricao);
    data.append('ativo', String(ativo));
    data.append('quantidade', String(quantidade));
    data.append('unidade_quantidade', unidade_quantidade);
    data.append('tipo_produto', tipo_produto);

    data.append('ingredientes', JSON.stringify(ingredientes));
    data.append('ingredientes_opcionais', JSON.stringify(ingredientes_opcionais));

    const data_hora_formata = FormatadorDados.GeradorDataHoraFormatada(FORMATO_DATA_COM_HORA_3);
    data.append('data_cadastro', data_hora_formata);
    data.append('data_modificacao_cadastro', data_hora_formata);
    
    imagens.forEach(imagem => {
      data.append('imagens', imagem);
    });

    const id = sessionStorage.getItem('id');
    const valida_id = (id) ? id : 'id';
    data.append('usuario_id', valida_id);

    // await api.post('refeicao', data)
    await ApiCadastroRefeicao(data)
      .then(() => {
        ModalSucessoCadastro();
        helpers.resetForm();
        navigation(`/home`);
      }).catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
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
          imagens={imagensVisualizacao}
          setImagens={setImagensVisualizacao}
          exibe_imagens_antigas={false}
          arquivos_aceitos_quantidade={3}
        />
      </Row>
    </ContainerApp>
  );
}
