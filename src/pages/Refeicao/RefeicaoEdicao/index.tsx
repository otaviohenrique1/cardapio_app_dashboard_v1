import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";
import { validacaoSchemaFormularioRefeicao, valoresIniciaisFormularioRefeicao } from "../../../utils/constantes";
import { FormularioRefeicao } from "../../../components/Formularios/FormularioRefeicao";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { format } from "date-fns";

const SwalModal = withReactContent(Swal);

export function RefeicaoEdicao() {
  const [data, setData] = useState<FormularioRefeicaoTypes>(valoresIniciaisFormularioRefeicao);
  const [imagens, setImagens] = useState([]);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`refeicao/${id}`)
      .then((item) => {
        const nome = item.data.nome;
        const preco = item.data.preco;
        const ativo = item.data.ativo;
        const ingredientes = JSON.parse(String(item.data.ingredientes));
        const descricao = item.data.descricao;
        const imagens = item.data.imagens.map((imagem: any) => ({
          fileName: imagem.name,
          type: imagem.type,
          size: `${imagem.size} bytes`
        }));
        
        const data = { nome, preco, ativo, ingredientes, descricao, imagens };

        setData(data);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, [id]);

  const dadosDaRefeicao: FormularioRefeicaoTypes = {
    nome: data.nome || "",
    preco: data.preco || 0,
    ativo: data.ativo || false,
    ingredientes: data.ingredientes || [],
    descricao: data.descricao || "",
    imagens: data.imagens || [],
  };

  async function handleSubmit(values: FormularioRefeicaoTypes) {
    const nome = values.nome;
    const preco = values.preco;
    const ingredientes = JSON.stringify(values.ingredientes);
    const descricao = values.descricao;
    const ativo = values.ativo;
    let data_modificacao_cadastro = format(new Date(), 'yyyy-MM-dd');

    await api.put(`refeicao/${id}`, {
      'id': id,
      'nome': nome,
      'preco': preco,
      'ingredientes': ingredientes,
      'descricao': descricao,
      'ativo': ativo,
      'data_modificacao_cadastro': data_modificacao_cadastro,
    }).then(() => {
      SwalModal.fire({
        title: "Cadastro alterado com sucesso!",
        buttonsStyling: false,
        confirmButtonText: 'Fechar',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
      navigation(`/refeicao/${id}`);
    }).catch((error) => {
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
          imagens={imagens}
          setImagens={setImagens}
        />
      </Row>
    </ContainerApp>
  );
}
