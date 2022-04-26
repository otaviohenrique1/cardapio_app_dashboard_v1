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
import { CampoListaFotos } from "../../Campos/CampoListaFotos";
import { CampoTextArea } from "../../Campos/CampoTextArea";

interface FormularioRefeicaoProps {
  initialValues: RefeicaoTypes;
  validationSchema: any;
  onSubmit: (values: RefeicaoTypes, helpers: FormikHelpers<RefeicaoTypes>) => Promise<void>;
  voltarLink: To;
  enableReinitialize: boolean;
  imagens: never[];
  setImagens: React.Dispatch<React.SetStateAction<never[]>>;
  exibe_imagens_antigas: boolean;
}
export function FormularioRefeicao(props: FormularioRefeicaoProps) {
  const { initialValues, validationSchema, onSubmit, enableReinitialize, voltarLink,
    imagens, setImagens, exibe_imagens_antigas } = props;

  const tamanhoMaximoEmBytesDoArquivo = 3000000; // 3000000 bytes => 3 megabytes
  const listaDeTiposDeArquivosAceitos = ['jpg', 'gif', 'png'];
  const quantidadeMaximaDeArquivosAceitos = 3;
  const resolucao_Largura = 1200;
  const resolucao_Altura = 1200;

  return (
    <Col md={12}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
      >
        {({ errors, touched, values, setFieldValue }) => {
          const { nome, preco, descricao, ingredientes, ativo, imagens_antigas } = values;
          // const validaAtivo = (ativo) ? true : false;

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
                  value={nome}
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
                  value={String(preco)}
                  error={errors.preco}
                  touched={touched.preco}
                />
                <CampoTextArea
                  md={12}
                  id="descricao"
                  label="Descrição da refeição"
                  name="descricao"
                  placeholder="Digite a descrição da refeição"
                  value={descricao}
                  error={errors.descricao}
                  touched={touched.descricao}
                />
                <CampoIngredientes ingredientes={ingredientes} />
                <CampoCheckbox name="ativo" checked={(ativo) ? true : false}
                >Ativo</CampoCheckbox>
                {(exibe_imagens_antigas) ? (
                  <CampoListaFotos imagens_antigas={imagens_antigas} />
                ) : null}
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
                    resolutionWidth={resolucao_Largura}
                    resolutionHeight={resolucao_Altura}
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
