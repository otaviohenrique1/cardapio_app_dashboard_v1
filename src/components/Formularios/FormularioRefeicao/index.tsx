import { Form, Formik, FormikHelpers } from "formik";
import { ImageListType } from "react-images-uploading";
import { To } from "react-router-dom";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Botao } from "../../Botoes/Botao";
import { BotaoLink } from "../../Botoes/BotaoLink";
import { CampoCheckbox } from "../../Campos/CampoCheckbox";
import { CampoDropzone } from "../../Campos/CampoDropzone";
import { CampoIngredientes } from "../../Campos/CampoIngredientes";
import { CampoInput } from "../../Campos/CampoInput";
import { CampoTextArea } from "../../Campos/CampoTextArea";

interface FormularioRefeicaoProps {
  initialValues: RefeicaoTypes;
  validationSchema: any;
  onSubmit: (values: RefeicaoTypes, helpers: FormikHelpers<RefeicaoTypes>) => Promise<void>;
  voltarLink: To;
  enableReinitialize: boolean;
  imagens: never[];
  setImagens: React.Dispatch<React.SetStateAction<never[]>>;
}
export function FormularioRefeicao(props: FormularioRefeicaoProps) {
  const tamanhoMaximoEmBytesDoArquivo = 3000000; // 3000000 bytes => 3 megabytes
  const listaDeTiposDeArquivosAceitos = ['jpg', 'gif', 'png'];
  const quantidadeMaximaDeArquivosAceitos = 3;
  const { initialValues, validationSchema, onSubmit, enableReinitialize, voltarLink, imagens, setImagens } = props;

  return (
    <Col md={12}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
      >
        {({ errors, touched, values, setFieldValue }) => {
          const validaAtivo = (values.ativo) ? true : false;

          return (
            <Form encType="multipart/form-data">
              <Row>
                <CampoInput
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
                <CampoInput
                  md={12}
                  id="preco"
                  label="Preço da refeição"
                  name="preco"
                  type="number"
                  placeholder="Digite o preco da refeição"
                  value={String(values.preco)}
                  error={errors.preco}
                  touched={touched.preco}
                />
                <CampoTextArea
                  md={12}
                  id="descricao"
                  label="Descrição da refeição"
                  name="descricao"
                  placeholder="Digite a descrição da refeição"
                  value={values.descricao}
                  error={errors.descricao}
                  touched={touched.descricao}
                />
                <CampoIngredientes ingredientes={values.ingredientes} />
                <CampoCheckbox name="ativo" checked={validaAtivo}>Ativo</CampoCheckbox>
                <Col md={12} className="pt-3 pb-3">
                  <CampoDropzone
                    multiple
                    maxNumber={quantidadeMaximaDeArquivosAceitos}
                    onChange={(imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
                      setImagens(imageList as never[]);
                      let lista_imagens = imageList.map((item) => {
                        const { file } = item;
                        return file;
                      });
                      setFieldValue("imagem", lista_imagens);
                    }}
                    value={imagens}
                    maxFileSize={tamanhoMaximoEmBytesDoArquivo}
                    acceptType={listaDeTiposDeArquivosAceitos}
                  />
                </Col>
                <Col md={12} className="d-flex justify-content-end pt-3">
                  <ButtonGroup>
                    <Botao type="submit" color="primary">Salvar</Botao>
                    <Botao type="reset" color="danger">Limpar</Botao>
                    <BotaoLink to={voltarLink} color="info">Voltar</BotaoLink>
                  </ButtonGroup>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Col>
  );
}
