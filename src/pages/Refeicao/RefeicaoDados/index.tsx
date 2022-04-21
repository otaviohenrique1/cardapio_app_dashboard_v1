import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
// import { UncontrolledCarousel } from "reactstrap";
// import { GrImage } from "react-icons/gr";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import { ItemListaFichaDados } from "../../../components/Listas/ItemListaFichaDados";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import api from "../../../utils/api";
// import { ModalErroCadastro } from "../../../components/Modals";
import { FormatadorDados } from "../../../utils/FormatadorDados";
// import { ConversorListas } from "../../../utils/ConversorListas";
import { FORMATO_DATA_COM_HORA_4, valoresIniciaisRefeicaoDados } from "../../../utils/constantes";
import { IngredientesLista } from "../../../components/Listas/Ingredientes/IngredientesLista";
import { CarouselImagens } from "../../../components/CarouselImagens";

export function RefeicaoDados() {
  const [data, setData] = useState<RefeicaoDadosTypes>(valoresIniciaisRefeicaoDados);
  let { id } = useParams();

  useEffect(() => {
    api.get(`refeicao/${id}`)
      .then((item) => {
        if (!id) { return; }

        const { nome, codigo, preco, ingredientes, descricao, ativo, data_cadastro,
          data_modificacao_cadastro, imagens } = item.data;

        const preco_formatado = FormatadorDados.FormataValorMonetarioTexto(preco);
        const status_refeicao = FormatadorDados.ValidaStatusRefeicao(ativo);

        // let a = imagens as FotoTypes[];
        // console.log("----------------------------");
        // console.log("imagem");
        // console.log(a);
        // console.log("----------------------------");

        const data_cadastro_formatada = FormatadorDados
          .FormatadorDataHora(data_cadastro, FORMATO_DATA_COM_HORA_4);
        const data_modificacao_cadastro_formatada = FormatadorDados
          .FormatadorDataHora(data_modificacao_cadastro, FORMATO_DATA_COM_HORA_4);

        const ingredientes_lista_formatada = [...ingredientes] as IngredientesTypes[];
        // const imagens_lista = [...imagem] as File[];
        const imagens_lista = [...imagens] as FotoTypes[];

        const data = {
          id,
          nome: String(nome),
          preco: preco_formatado,
          ativo: status_refeicao,
          // ingredientes: ingredientes_lista_formatada,
          ingredientes: ingredientes_lista_formatada,
          descricao: String(descricao),
          codigo: String(codigo),
          imagens: imagens_lista,
          data_cadastro: data_cadastro_formatada,
          data_modificacao_cadastro: data_modificacao_cadastro_formatada
        };

        setData(data);
      })
      .catch((error) => {
        // ModalErroCadastro();
        console.error(error);
      });
  }, [id]);

  const { nome, codigo, preco, ingredientes, descricao, ativo, data_cadastro, data_modificacao_cadastro, imagens } = data;

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">{nome}</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ListGroupItem className="d-flex justify-content-center">
              {/* <MdOutlineImageNotSupported size={100} /> */}
              {(imagens.length === 0) ? (
                <MdOutlineImageNotSupported size={100} />
              ) : (
                <CarouselImagens data={imagens} />
                // <div>
                //   {imagens.map((item, index) => {
                //     const { id, url } = item;
                //     return (
                //       <img
                //         style={{ width: '50px' }}
                //         src={url}
                //         alt={`imagem-${id}`}
                //         key={index}
                //       />
                //       // <ul key={index}>
                //       //   <li>{`id=>${id}`}</li>
                //       //   <li>{`url=>${url}`}</li>
                //       // </ul>
                //     );
                //   })}
                // </div>
              )}
            </ListGroupItem>
            <ItemListaFichaDados titulo="Id" valor={id} />
            <ItemListaFichaDados titulo="Preço (R$)" valor={preco} />
            <ItemListaFichaDados titulo="Status" valor={ativo} />
            <ItemListaFichaDados titulo="Descrição" valor={descricao} />
            <ItemListaFichaDados titulo="Código" valor={codigo} />
            <ItemListaFichaDados titulo="Data de cadastro" valor={data_cadastro} />
            <ItemListaFichaDados titulo="Data de atualização do cadastro" valor={data_modificacao_cadastro} />
            <ListGroupItem>
              <IngredientesLista data={ingredientes} />
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/refeicao/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}
