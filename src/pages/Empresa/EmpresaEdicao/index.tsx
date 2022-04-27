import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioEmpresa } from "../../../components/Formularios/FormularioEmpresa";
import { ModalErroCadastro, ModalSucessoCadastro } from "../../../components/Modals";
import { ApiBuscaDadosUmaEmpresa, ApiEdicaoEmpresa, ApiEdicaoEmpresaTypes } from "../../../utils/api";
import { FORMATO_DATA_COM_HORA_3, valoresIniciaisFormularioUsuario } from "../../../utils/constantes";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { FormatadorCrypto } from "../../../utils/FormatadorCrypto";
import { validacaoSchemaFormularioUsuario } from "../../../utils/ValidacaoSchemas";

export function EmpresaEdicao() {
  const [data, setData] = useState<UsuarioTypes>(valoresIniciaisFormularioUsuario);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    if (!id) { return; }
    // api.get(`usuario/${id}`)
    ApiBuscaDadosUmaEmpresa(id)
      .then((item) => {
        let { nome, email, senha } = item.data;
        let data = { nome, email, senha };
        setData(data);
      })
      .catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }, [id]);

  async function handleSubmit(values: UsuarioTypes) {
    const { nome, email, senha } = values;

    if (id === undefined) { return; }

    let senha_formatada = FormatadorCrypto.mensagemSHA512(senha);
    let data_modificacao_cadastro = FormatadorDados.GeradorDataHoraFormatada(FORMATO_DATA_COM_HORA_3);

    const data: ApiEdicaoEmpresaTypes = {
      'id': id,
      'nome': nome,
      'email': email,
      'senha': senha_formatada,
      'data_modificacao_cadastro': data_modificacao_cadastro,
    };

    // await api.put(`usuario/${id}`, data)
    await ApiEdicaoEmpresa(data)
      .then(() => {
        ModalSucessoCadastro();
        navigation(`/empresa/${id}`);
      }).catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }

  let { nome, email, senha } = data;

  const dadosDoUsuario: UsuarioTypes = {
    nome: nome || "",
    email: email || "",
    senha: "",
  };

  const senha_antiga = FormatadorDados.FormataExibicaoSenha(senha.slice(0, 12));

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <FormularioEmpresa
          initialValues={dadosDoUsuario}
          validationSchema={validacaoSchemaFormularioUsuario}
          onSubmit={handleSubmit}
          enableReinitialize
          voltarLink={`/empresa/${id}`}
          exibe_senha_antiga={true}
          senha_antiga={senha_antiga}
        />
      </Row>
    </ContainerApp>
  );
}
