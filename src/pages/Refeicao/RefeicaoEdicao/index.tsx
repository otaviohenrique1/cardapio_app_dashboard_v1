import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioRefeicao } from "../../../components/Formularios/FormularioRefeicao";
import { ModalErroCadastro, ModalErroDadosNaoCarregados, ModalSucessoCadastro } from "../../../components/Modals";
import { FORMATO_DATA_COM_HORA_3, valoresIniciaisFormularioRefeicao } from "../../../utils/constantes";
import api from "../../../utils/api";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { ConversorListas } from "../../../utils/ConversorListas";
import { validacaoSchemaFormularioRefeicao } from "../../../utils/ValidacaoSchemas";

export function RefeicaoEdicao() {
  const [data, setData] = useState<RefeicaoTypes>(valoresIniciaisFormularioRefeicao);
  const [imagensVisualizacao, setImagensVisualizacao] = useState([]);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`refeicao/${id}`)
      .then((item) => {
        const { nome, preco, ingredientes, descricao, ativo, imagens } = item.data;
        const ingredientes_lista_formatada = [...ingredientes] as IngredientesTypes[];

        console.log(imagens);

        /* Arrumar */
        /* Pegar imagem do servidor e colocar na lista */
        // const imagens_lista = imagens.map((imagem: any) => ({
        //   fileName: imagem.name,
        //   type: imagem.type,
        //   size: `${imagem.size} bytes`
        // }));

        const data = {
          nome,
          preco,
          ativo,
          ingredientes: ingredientes_lista_formatada,
          descricao,
          imagens: []
        };

        setData(data);
      })
      .catch((error) => {
        ModalErroDadosNaoCarregados();
        console.error(error);
      });
  }, [id]);

  const { nome, preco, ingredientes, descricao, ativo, imagens } = data;

  const dadosDaRefeicao: RefeicaoTypes = {
    nome: nome || "",
    preco: preco || 0,
    ativo: ativo || false,
    ingredientes: ingredientes || [],
    descricao: descricao || "",
    imagens: imagens || [],
  };

  async function handleSubmit(values: RefeicaoTypes) {
    const data = new FormData();

    const { nome, preco, ingredientes, descricao, ativo } = values;

    let ingredientes_lista = ConversorListas.ConverteArrayObjetosParaString(ingredientes);
    let data_modificacao_cadastro = FormatadorDados.GeradorDataHoraFormatada(FORMATO_DATA_COM_HORA_3);

    data.append('nome', nome);
    data.append('preco', String(preco));
    data.append('ingredientes', ingredientes_lista);
    data.append('ativo', String(ativo));
    data.append('descricao', descricao);
    data.append('data_modificacao_cadastro', data_modificacao_cadastro);

    /* Arrumar logica do upload de imagem. Substituir imagem no servidor. */
    values.imagens.forEach(imagem => {
      data.append('images', imagem);
    });

    await api.put(`refeicao/${id}`, data)
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
        />
      </Row>
    </ContainerApp>
  );
}
