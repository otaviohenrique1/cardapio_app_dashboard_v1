import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import { ItemFichaDados } from "../../../components/Listas/ListaFichaDados/ItemFichaDados";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";
import { ApiBuscaDadosUmaRefeicao } from "../../../utils/api";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { FORMATO_DATA_COM_HORA_4, valoresIniciaisFormularioRefeicao } from "../../../utils/constantes";
import { ItemFichaDadosIngredientes } from "../../../components/Listas/ListaFichaDados/ItemFichaDadosIngredientes";
import { ItemFichaDadosImagem } from "../../../components/Listas/ListaFichaDados/ItemFichaDadosImagem";
import { ItemFichaDadosIngredientesOpcionais } from "../../../components/Listas/ListaFichaDados/ItemFichaDadosIngredientesOpcionais";

export function RefeicaoDados() {
  const [data, setData] = useState<RefeicaoTypes>(valoresIniciaisFormularioRefeicao);
  let { id } = useParams();

  useEffect(() => {
    if (!id) { return; }

    // api.get(`refeicao/${id}`)
    ApiBuscaDadosUmaRefeicao(id)
      .then((item) => {
        if (!id) { return; }

        const { nome, codigo, preco, ingredientes, descricao, ativo, data_cadastro,
          data_modificacao_cadastro, imagens, quantidade, unidade_quantidade,
          tipo_produto, ingredientes_opcionais } = item.data;

        const preco_formatado = FormatadorDados.FormataValorMonetarioTexto(preco);
        const status_refeicao = FormatadorDados.ValidaStatusRefeicao(ativo);

        const data_cadastro_formatada = FormatadorDados
          .FormatadorDataHora(data_cadastro, FORMATO_DATA_COM_HORA_4);
        const data_modificacao_cadastro_formatada = FormatadorDados
          .FormatadorDataHora(data_modificacao_cadastro, FORMATO_DATA_COM_HORA_4);

        const ingredientes_lista_formatada = [...ingredientes] as IngredientesTypes[];
        const imagens_lista = [...imagens] as FotoTypes[];
        const ingredientes_opcionais_lista_formatada = [...ingredientes_opcionais] as IngredientesOpcionaisTypes[];

        const data: RefeicaoTypes = {
          id,
          nome: String(nome),
          preco: preco_formatado,
          ativo: status_refeicao,
          ingredientes: ingredientes_lista_formatada,
          descricao: String(descricao),
          codigo: String(codigo),
          imagens_galeria: imagens_lista,
          data_cadastro: data_cadastro_formatada,
          data_modificacao_cadastro: data_modificacao_cadastro_formatada,
          ingredientes_opcionais: ingredientes_opcionais_lista_formatada,
          quantidade: quantidade,
          unidade_quantidade: unidade_quantidade,
          tipo_produto: tipo_produto,
          imagens: [],
          imagens_antigas: [],
          imagens_removidas: []
        };

        setData(data);
      })
      .catch((error) => {
        ModalErroDadosNaoCarregados();
        console.error(error);
      });
  }, [id]);

  const { nome, codigo, preco, ingredientes, descricao, ativo, data_cadastro, data_modificacao_cadastro,
    imagens_galeria, ingredientes_opcionais, quantidade, unidade_quantidade, tipo_produto } = data;

  const lista_dados = [
    { titulo: "Id", valor: id || 'id' },
    { titulo: "Preço (R$)", valor: preco },
    { titulo: "Status", valor: ativo },
    { titulo: "Descrição", valor: descricao },
    { titulo: "Código", valor: codigo },
    { titulo: "Data de cadastro", valor: data_cadastro },
    { titulo: "Data de atualização do cadastro", valor: data_modificacao_cadastro },
    { titulo: "Quantidade", valor: `${quantidade} ${unidade_quantidade}` },
    { titulo: "Tipo de produto", valor: tipo_produto },
  ];

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">{nome}</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            {lista_dados.map((item, index) => <ItemFichaDados key={index} titulo={item.titulo} valor={item.valor} />)}
            <ItemFichaDadosIngredientes data={ingredientes} />
            <ItemFichaDadosImagem data={imagens_galeria} />
            <ItemFichaDadosIngredientesOpcionais data={ingredientes_opcionais} />
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/refeicao/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}
