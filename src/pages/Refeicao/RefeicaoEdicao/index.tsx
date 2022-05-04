import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioRefeicao } from "../../../components/Formularios/FormularioRefeicao";
import { ModalErroCadastro, ModalErroDadosNaoCarregados, ModalSucessoCadastro } from "../../../components/Modals";
import { FORMATO_DATA_COM_HORA_3, valoresIniciaisFormularioRefeicao } from "../../../utils/constantes";
import { ApiBuscaDadosUmaRefeicao, ApiEdicaoRefeicao } from "../../../utils/api";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { validacaoSchemaFormularioRefeicao } from "../../../utils/ValidacaoSchemas";

export function RefeicaoEdicao() {
  const [data, setData] = useState<RefeicaoTypes>(valoresIniciaisFormularioRefeicao);
  const [imagensVisualizacao, setImagensVisualizacao] = useState([]);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    if (!id) { return; }

    // api.get(`refeicao/${id}`)
    ApiBuscaDadosUmaRefeicao(id)
      .then((item) => {
        const { nome, preco, ingredientes, descricao, ativo, imagens,
          ingredientes_opcionais, quantidade, unidade_quantidade, tipo_produto } = item.data;
        
        const ingredientes_lista_formatada = [...ingredientes] as IngredientesTypes[];
        const ingredientes_opcionais_lista_formatada = [...ingredientes_opcionais] as IngredientesOpcionaisTypes[];
        const imagens_antigas_lista_formatada = [...imagens] as FotoTypes[];

        const data: RefeicaoTypes = {
          nome, preco, ativo, descricao, ingredientes: ingredientes_lista_formatada,
          ingredientes_opcionais: ingredientes_opcionais_lista_formatada,
          quantidade, unidade_quantidade, tipo_produto,
          imagens: [], imagens_antigas: imagens_antigas_lista_formatada,
          id: "", codigo: "", imagens_removidas: [], imagens_galeria: [],
          data_cadastro: "", data_modificacao_cadastro: "",
        };

        setData(data);
      })
      .catch((error) => {
        ModalErroDadosNaoCarregados();
        console.error(error);
      });
  }, [id]);

  const { nome, preco, ingredientes, ingredientes_opcionais, quantidade,
    unidade_quantidade, tipo_produto, descricao, ativo, imagens, imagens_antigas } = data;

  const dadosDaRefeicao: RefeicaoTypes = {
    nome: nome || "",
    preco: preco || "",
    ativo: ativo || false,
    ingredientes: ingredientes || [],
    ingredientes_opcionais: ingredientes_opcionais || [],
    quantidade: quantidade || "",
    unidade_quantidade: unidade_quantidade || "",
    tipo_produto: tipo_produto || "",
    descricao: descricao || "",
    imagens: imagens || [],
    imagens_antigas: imagens_antigas || [],
    id: "",
    imagens_removidas: [],
    data_modificacao_cadastro: "",
    imagens_galeria: [],
    codigo: "",
    data_cadastro: ""
  };

  async function handleSubmit(values: RefeicaoFormularioEdicaoTypes) {
    if (!id) { return; }

    const data = new FormData();

    const { nome, preco, ingredientes, descricao, ativo, imagens, imagens_removidas } = values;

    let data_modificacao_cadastro = FormatadorDados.GeradorDataHoraFormatada(FORMATO_DATA_COM_HORA_3);

    data.append('nome', nome);
    data.append('preco', String(preco));
    data.append('descricao', descricao);
    data.append('ativo', String(ativo));
    data.append('ingredientes', JSON.stringify(ingredientes));
    data.append('data_modificacao_cadastro', data_modificacao_cadastro);

    /* Lista de imagens que serao removidas no banco de dados */
    data.append('imagens_removidas', JSON.stringify(imagens_removidas));

    imagens.forEach(imagem => {
      data.append('imagens', imagem);
    });

    // await api.put(`refeicao/${id}`, data)
    ApiEdicaoRefeicao(id, data)
      .then(() => {
        ModalSucessoCadastro();
        navigation(`/refeicao/${id}`);
      })
      .catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <FormularioRefeicao
          initialValues={dadosDaRefeicao}
          validationSchema={validacaoSchemaFormularioRefeicao}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          voltarLink={`/refeicao/${id}`}
          imagens={imagensVisualizacao}
          setImagens={setImagensVisualizacao}
          exibe_imagens_antigas={true}
          arquivos_aceitos_quantidade={3}
        />
      </Row>
    </ContainerApp>
  );
}
