import { Form, Formik, FormikHelpers } from "formik";
import { ImageListType } from "react-images-uploading";
import { To } from "react-router-dom";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Botao } from "../../Botoes/Botao";
import { BotaoLink } from "../../Botoes/BotaoLink";
import { CampoCheckbox } from "../../Campos/CampoCheckbox";
import { CampoDropzone, CampoDropzoneContainerCol } from "../../Campos/CampoDropzone";
import { CampoIngredientes } from "../../Campos/CampoIngredientes";
import { CampoInput, CampoInputProps } from "../../Campos/CampoInput";
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
  arquivos_aceitos_quantidade: number;
}
export function FormularioRefeicao(props: FormularioRefeicaoProps) {
  const { initialValues, validationSchema, onSubmit, enableReinitialize, voltarLink,
    imagens, setImagens, exibe_imagens_antigas, arquivos_aceitos_quantidade } = props;

  const tamanho_maximo_em_bytes_do_arquivo = 3145728; // 3145728 bytes => 3 megabytes
  // const tamanho_maximo_em_bytes_do_arquivo = 3000000; // 3000000 bytes => 3 megabytes
  const lista_de_tipos_de_arquivos_aceitos = ['jpg', 'gif', 'png'];
  // const quantidade_maxima_de_arquivos_aceitos = arquivos_aceitos_quantidade;
  /*
    resolucao (altura x largura) pixels:
      1200 x 1200 pixels
  */
  const resolucao_largura = 1200; // 1200 pixels
  const resolucao_altura = 1200; // 1200 pixels

  return (
    <Col md={12}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
      >
        {(formik_props) => {
          const { errors, touched, values, setFieldValue } = formik_props;

          const lista_campos_dados: CampoInputProps[] = [
            {
              md: 12,
              id: "nome",
              label: "Nome da refeição",
              name: "nome",
              type: "text",
              placeholder: "Digite o nome da refeição",
              value: values.nome,
              error: errors.nome,
              touched: touched.nome,
            },
            {
              md: 12,
              id: "preco",
              label: "Preço da refeição",
              name: "preco",
              type: "number",
              placeholder: "Digite o preco da refeição",
              value: String(values.preco),
              error: errors.preco,
              touched: touched.preco,
            }
          ];

          return (
            <Form encType="multipart/form-data">
              <Row>
                {lista_campos_dados.map((item, index) => {
                  const { md, id, label, name, type, placeholder, value, error, touched } = item;
                  return (
                    <CampoInput
                      key={index}
                      md={md}
                      id={id}
                      label={label}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={value}
                      error={error}
                      touched={touched}
                    />
                  );
                })}
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
                <CampoIngredientes
                  ingredientes={values.ingredientes}
                />
                <CampoCheckbox
                  name="ativo"
                  checked={(values.ativo) ? true : false}
                  label="Ativo"
                />
                {(exibe_imagens_antigas) ? (
                  <CampoListaFotos
                    md={12}
                    titulo="Fotos"
                    imagens_antigas={values.imagens_antigas}
                  />
                ) : null}
                {/*
                  Ideia da logica de exibir ou nao o 'CampoDropzone':
                  1) se arquivos_aceitos_quantidade for 3
                    e values_imagens_antigas.length for 3:
                      o 'CampoDropzone' nao vai ser exibido
                  2) se arquivos_aceitos_quantidade for 3
                    e values_imagens_antigas.length for menor que 3 (2 ou 1 ou 0):
                      o 'CampoDropzone' vai ser exibido
                */}
                {(values.imagens_antigas.length < arquivos_aceitos_quantidade) ? (
                  <CampoDropzoneContainerCol
                    md={12}
                    titulo="Fotos"
                  >
                    <CampoDropzone
                      multiple
                      maxNumber={arquivos_aceitos_quantidade}
                      onChange={(imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
                        setImagens(imageList as never[]);
                        let lista_imagens = imageList.map((item) => {
                          const { file } = item;
                          return file;
                        });
                        setFieldValue("imagem", lista_imagens);
                      }}
                      value={imagens}
                      maxFileSize={tamanho_maximo_em_bytes_do_arquivo}
                      acceptType={lista_de_tipos_de_arquivos_aceitos}
                      resolutionWidth={resolucao_largura}
                      resolutionHeight={resolucao_altura}
                    />
                  </CampoDropzoneContainerCol>
                ) : null}
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
