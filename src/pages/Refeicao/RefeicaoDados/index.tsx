import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup, Col, Label, ListGroup, ListGroupItem, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { FormataValorMonetarioTexto } from "../../../utils/utils";
import * as Yup from "yup";
import { Form, Field, Formik } from "formik";
import { CampoFormularioCadastro } from "../../../components/Campos";

interface RefeicaoDadosTypes {
  id: string;
  nome: string;
  preco: number;
  ativo: boolean;
  ingredientes: string;
  data_cadastro: string;
}

const valoresIniciaisRefeicaoDados: RefeicaoDadosTypes = {
  id: "",
  nome: "",
  preco: 0,
  ativo: false,
  ingredientes: "",
  data_cadastro: ""
};

export function RefeicaoDados() {
  const [data, setData] = useState<RefeicaoDadosTypes>(valoresIniciaisRefeicaoDados);
  const [abreEdicao, setAbreEdicao] = useState<boolean>(false);
  let { id } = useParams();

  useEffect(() => {
    api.get(`refeicao/${id}`)
      .then((item) => {
        if (!id) {
          return;
        }

        let nome = item.data.nome;
        let preco = item.data.preco;
        let ativo = item.data.ativo;
        let ingredientes = item.data.ingredientes;
        let data_cadastro = format(new Date(item.data.data_cadastro), 'dd/MM/yyyy');

        setData({ id, nome, preco, ativo, ingredientes, data_cadastro });
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, [abreEdicao, id]);

  const abreTelaEdicao = () => {
    setAbreEdicao(!abreEdicao);
  }

  return (
    <ContainerApp>
      <Row>
        {(!abreEdicao) ? (
          <FichaDados
            abreTelaEdicao={abreTelaEdicao}
            data={data}
          />
        ) : (
          <Formulario
            data={{
              nome: data.nome,
              preco: data.preco,
              ativo: data.ativo,
              ingredientes: data.ingredientes,
            }}
            id={data.id}
            abreTelaEdicao={abreTelaEdicao}
          />
        )}
      </Row>
    </ContainerApp>
  );
}

interface FichaDadosProps {
  abreTelaEdicao: () => void;
  data: RefeicaoDadosTypes;
}

function FichaDados(props: FichaDadosProps) {
  return (
    <>
      <Col md={12}>
        <Titulo tag="h1" className="w-100 text-center mb-5">{props.data.nome}</Titulo>
      </Col>
      <Col md={12}>
        <ListGroup>
          <ItemRefeicaoDados
            titulo="Código"
            valor={props.data.id}
          />
          <ItemRefeicaoDados
            titulo="Preço (R$)"
            valor={FormataValorMonetarioTexto(props.data.preco)}
          />
          <ItemRefeicaoDados
            titulo="Status"
            valor={(props.data.ativo) ? 'Ativo' : 'Inativo'}
          />
          <ItemRefeicaoDados
            titulo="Ingredientes"
            valor={props.data.ingredientes}
          />
          <ItemRefeicaoDados
            titulo="Data de cadastro"
            valor={props.data.data_cadastro}
          />
        </ListGroup>
      </Col>
      <Col md={12} className="d-flex justify-content-end mt-5">
        <Button type="button" color="primary" onClick={props.abreTelaEdicao}>Editar</Button>
      </Col>
    </>
  );
}

interface ItemRefeicaoDadosProps {
  titulo: string;
  valor: string;
}

function ItemRefeicaoDados(props: ItemRefeicaoDadosProps) {
  return (
    <ListGroupItem className="d-flex flex-row justify-content-between">
      <Titulo tag="h5" className="w-100">{props.titulo}</Titulo>
      <Titulo tag="h5" className="w-100">{props.valor}</Titulo>
    </ListGroupItem>
  );
}

const validacaoSchema = Yup.object().shape({
  nome: Yup.string().required(),
  preco: Yup.number().required(),
  ingredientes: Yup.string().required(),
});

interface FormularioTypes {
  nome: string,
  preco: number,
  ativo: boolean,
  ingredientes: string,
}

interface FormularioProps {
  abreTelaEdicao: () => void;
  data: FormularioTypes;
  id: string;
}

function Formulario(props: FormularioProps) {
  const valoresIniciaisFormulario: FormularioTypes = {
    nome: props.data.nome,
    preco: props.data.preco,
    ativo: props.data.ativo,
    ingredientes: props.data.ingredientes,
  };

  async function handleSubmit(values: FormularioTypes) {
    await api.put(`refeicao/${props.id}`, {
      'nome': values.nome,
      'preco': (values.preco).toString(),
      'ingredientes': values.ingredientes,
      'ativo': values.ativo,
    }).then(() => {
      alert('Cadastro alterado com sucesso!');
      props.abreTelaEdicao();
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
      <Col md={12}>
        <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
      </Col>
      <Col md={12}>
        <Formik
          initialValues={valoresIniciaisFormulario}
          validationSchema={validacaoSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, values }) => (
            <Form>
              <Row>
                <CampoFormularioCadastro
                  md={12}
                  id="nome"
                  label="Nome da refeição"
                  name="nome"
                  type="text"
                  placeholder="Digite o nome da refeição"
                  value={values.nome}
                  error={errors.nome}
                  touched={touched.nome}
                />
                <CampoFormularioCadastro
                  md={12}
                  id="preco"
                  label="Preço da refeição"
                  name="preco"
                  type="number"
                  placeholder="Digite o preco da refeição"
                  value={`${values.preco}`}
                  error={errors.preco}
                  touched={touched.preco}
                />
                <CampoFormularioCadastro
                  md={12}
                  id="ingredientes"
                  label="Ingredientes da refeição"
                  name="ingredientes"
                  type="text"
                  placeholder="Digite o ingredientes da refeição"
                  value={values.ingredientes}
                  error={errors.ingredientes}
                  touched={touched.ingredientes}
                />
                <Col md={12} className="d-flex flex-row pt-3">
                  <Field
                    className="form-check"
                    type="checkbox"
                    name="ativo"
                    checked={(values.ativo) ? true : false}
                  />
                  <Label className="form-label ms-2">Ativo</Label>
                </Col>
                <Col md={12} className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button type="submit" color="primary">Salvar</Button>
                    <Button
                      type="button"
                      color="info"
                      onClick={props.abreTelaEdicao}
                    >Voltar</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </>
  );
}
