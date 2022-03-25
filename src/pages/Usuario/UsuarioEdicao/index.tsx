import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioUsuario } from "../../../components/Formularios/FormularioUsuario";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sha512 } from "../../../utils/utils";
import { format } from "date-fns";
import { validacaoSchemaFormularioUsuario, valoresIniciaisFormularioUsuario } from "../../../utils/constantes";

const SwalModal = withReactContent(Swal);

export function UsuarioEdicao() {
  const [data, setData] = useState<FormularioUsuarioTypes>(valoresIniciaisFormularioUsuario);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`usuario/${id}`)
      .then((item) => {
        let nome = item.data.nome;
        let email = item.data.email;
        let senha = item.data.senha;

        setData({ nome, email, senha });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const dadosDoUsuario: FormularioUsuarioTypes = {
    nome: data.nome || "",
    email: data.email || "",
    senha: data.senha || "",
  };

  async function handleSubmit(values: FormularioUsuarioTypes) {
    let nome = values.nome;
    let email = values.email;
    let senha = sha512(values.senha);
    let data_modificacao_cadastro = format(new Date(), 'yyyy-MM-dd');

    await api.put(`usuario/${id}`, {
      'id': id,
      'nome': nome,
      'email': email,
      'senha': senha,
      'data_modificacao_cadastro': data_modificacao_cadastro,
    }).then(() => {
      SwalModal.fire({
        icon: 'success',
        title: "Cadastro alterado com sucesso!",
        buttonsStyling: false,
        confirmButtonText: 'Fechar',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
      navigation(`/usuario/${id}`);
    }).catch((error) => {
      SwalModal.fire({
        icon: 'error',
        title: 'Erro',
        html: <p>{`${error}`}</p>,
        buttonsStyling: false,
        confirmButtonText: 'Fechar',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
      console.error(error);
    });
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <FormularioUsuario
          initialValues={dadosDoUsuario}
          validationSchema={validacaoSchemaFormularioUsuario}
          onSubmit={handleSubmit}
          enableReinitialize
          voltarLink={`/usuario/${id}`}
        />
      </Row>
    </ContainerApp>
  );
}
