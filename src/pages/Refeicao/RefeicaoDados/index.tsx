import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import { ItemFichaDados } from "../../../components/Listas/ListaFichaDados/ItemFichaDados";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import { ModalErroCadastro } from "../../../components/Modals";
import api from "../../../utils/api";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { FORMATO_DATA_COM_HORA_4, valoresIniciaisRefeicaoDados } from "../../../utils/constantes";
import { ItemFichaDadosIngredientes } from "../../../components/Listas/ListaFichaDados/ItemFichaDadosIngredientes";
import { ItemFichaDadosImagem } from "../../../components/Listas/ListaFichaDados/ItemFichaDadosImagem";

export function RefeicaoDados() {
  const [data, setData] = useState<RefeicaoDadosFichaTypes>(valoresIniciaisRefeicaoDados);
  let { id } = useParams();

  useEffect(() => {
    api.get(`refeicao/${id}`)
      .then((item) => {
        if (!id) { return; }

        const { nome, codigo, preco, ingredientes, descricao, ativo, data_cadastro,
          data_modificacao_cadastro, imagens } = item.data;

        const preco_formatado = FormatadorDados.FormataValorMonetarioTexto(preco);
        const status_refeicao = FormatadorDados.ValidaStatusRefeicao(ativo);

        const data_cadastro_formatada = FormatadorDados
          .FormatadorDataHora(data_cadastro, FORMATO_DATA_COM_HORA_4);
        const data_modificacao_cadastro_formatada = FormatadorDados
          .FormatadorDataHora(data_modificacao_cadastro, FORMATO_DATA_COM_HORA_4);

        const ingredientes_lista_formatada = [...ingredientes] as IngredientesTypes[];
        const imagens_lista = [...imagens] as FotoTypes[];

        const data: RefeicaoDadosFichaTypes = {
          id,
          nome: String(nome),
          preco: preco_formatado,
          ativo: status_refeicao,
          ingredientes: ingredientes_lista_formatada,
          descricao: String(descricao),
          codigo: String(codigo),
          imagens_galeria: imagens_lista,
          data_cadastro: data_cadastro_formatada,
          data_modificacao_cadastro: data_modificacao_cadastro_formatada
        };

        setData(data);
      })
      .catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }, [id]);

  const { nome, codigo, preco, ingredientes, descricao, ativo, data_cadastro, data_modificacao_cadastro, imagens_galeria: imagens } = data;

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">{nome}</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ItemFichaDados titulo="Id" valor={id || 'id'} />
            <ItemFichaDados titulo="Preço (R$)" valor={preco} />
            <ItemFichaDados titulo="Status" valor={ativo} />
            <ItemFichaDados titulo="Descrição" valor={descricao} />
            <ItemFichaDados titulo="Código" valor={codigo} />
            <ItemFichaDados titulo="Data de cadastro" valor={data_cadastro} />
            <ItemFichaDados titulo="Data de atualização do cadastro" valor={data_modificacao_cadastro} />
            <ItemFichaDadosIngredientes data={ingredientes} />
            <ItemFichaDadosImagem data={imagens} />
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/refeicao/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}
