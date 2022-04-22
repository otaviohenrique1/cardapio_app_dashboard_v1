import ImageUploading, { ErrorsType, ImageListType } from "react-images-uploading";
import { GrUpdate } from "react-icons/gr";
import { MdSystemUpdateAlt } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, ButtonGroup, Card, CardBody, CardFooter, /*CardGroup,*/ CardImg } from "reactstrap";
import styled from "styled-components";
import { AlertErro } from "../../AlertErro";

interface CampoDropzoneProps {
  value: ImageListType;
  onChange: (value: ImageListType, addUpdatedIndex?: number[] | undefined) => void;
  maxNumber?: number;
  multiple?: boolean;
  maxFileSize?: number;
  acceptType?: string[];
  resolutionWidth?: number;
  resolutionHeight?: number;
}

export function CampoDropzone(props: CampoDropzoneProps) {
  const { maxNumber, acceptType, maxFileSize, multiple,
    value, onChange, resolutionWidth, resolutionHeight } = props;

  return (
    <ImageUploading
      multiple={multiple}
      value={value}
      onChange={onChange}
      maxNumber={maxNumber}
      maxFileSize={maxFileSize}
      acceptType={acceptType}
      resolutionWidth={resolutionWidth}
      resolutionHeight={resolutionHeight}
    >
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => {
        const valida_is_dragging = isDragging ? { color: "red" } : undefined;
      
        return (
          <div className="upload__image-wrapper">
            <BotaoUploadEstilizado
              disabled={validaTamanhoListaImagem(value, 3)}
              color="light"
              className="w-100 border rounded"
              type="button"
              style={valida_is_dragging}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click ou Arraste imagens aqui <MdSystemUpdateAlt size={30} />
            </BotaoUploadEstilizado>
            &nbsp;
            <Button
              disabled={validaTamanhoListaImagem(value, 0)}
              color="danger"
              type="button"
              className="mt-2"
              onClick={onImageRemoveAll}
            >Remover todas as imagens</Button>
            <CampoDropzoneErroLista
              errors={errors}
              maxNumber={maxNumber}
              acceptType={acceptType}
              maxFileSize={maxFileSize}
              resolutionWidth={resolutionWidth}
              resolutionHeight={resolutionHeight}
            />
            {/* <CardGroup> */}
            <div className="d-flex flex-row justify-content-center">
              {imageList.map((image, index) => (
                <CardEstilizado key={index}>
                  <CardBody className="p-0 m-0 d-flex justify-content-center">
                    <CardImgEstilizado src={image.dataURL} alt={`imagem-${index}`} />
                  </CardBody>
                  <CardFooter className="p-0 m-0">
                    <ButtonGroup className="w-100">
                      <Button
                        className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
                        color="primary"
                        type="button"
                        onClick={() => onImageUpdate(index)}
                      >
                        <GrUpdate size={20} className="p-0 m-0" />
                      </Button>
                      <Button
                        className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
                        color="danger"
                        type="button"
                        onClick={() => onImageRemove(index)}
                      >
                        <AiOutlineDelete size={20} className="p-0 m-0" />
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </CardEstilizado>
              ))}
            </div>
            {/* </CardGroup> */}
          </div>
        );
      }}
    </ImageUploading>
  );
}

const BotaoUploadEstilizado = styled(Button)`
  height: 200px;
`;

const CardEstilizado = styled(Card)`
  width: 170px !important;
  margin: 5px !important;
  height: 210px !important;
`;

const CardImgEstilizado = styled(CardImg)`
  width: 170px !important;
  height: 170px !important;
`;

function validaTamanhoListaImagem(image_list: ImageListType, tamanho: number) {
  return (image_list.length === tamanho) ? true : false;
}

interface CampoDropzoneErroProps {
  errors: boolean | undefined;
  mensagem: string | number;
}

function CampoDropzoneErro(props: CampoDropzoneErroProps) {
  const { errors, mensagem } = props;

  return (
    <>
      {errors && <AlertErro>{mensagem}</AlertErro>}
    </>
  );
}

interface CampoDropzoneErroListaProps {
  errors: ErrorsType;
  maxFileSize?: number;
  acceptType?: string[];
  maxNumber?: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
}

function CampoDropzoneErroLista(props: CampoDropzoneErroListaProps) {
  const { errors, maxFileSize, acceptType, maxNumber, resolutionWidth, resolutionHeight } = props;

  const numero_maximo_imagems = `Numero maximo de imagems atingido. Maximo: ${maxNumber}`;
  
  const valida_tamanho_imagem = (maxFileSize) ? maxFileSize / 1000000 : 0; // 1000000 bytes => 1 megabytes
  const tamanho_maximo = `Tamanho maximo: ${valida_tamanho_imagem} mb`;
  const tamanho_maximo_arquivo = `Tamanho maximo de arquivo exedido. ${tamanho_maximo}`;

  const valida_tipos_nao_aceitos = acceptType?.join(',');
  const tipos_aceitos = `Aceitos: ${valida_tipos_nao_aceitos}`;
  const tipo_nao_aceito_imagem = `Tipo não aceito de imagem. ${tipos_aceitos}`;

  const largura_maxima = `Largura maxima: ${resolutionWidth}.`;
  const altura_maxima = `Altura maxima: ${resolutionHeight}.`;
  const resolucao_maxima_imagem = `Resolução maxima da imagem exedida. ${largura_maxima} ${altura_maxima}`;

  return (
    <>
      {errors && <div className="d-flex flex-column">
        <CampoDropzoneErro errors={errors.maxNumber} mensagem={numero_maximo_imagems} />
        <CampoDropzoneErro errors={errors.acceptType} mensagem={tipo_nao_aceito_imagem} />
        <CampoDropzoneErro errors={errors.maxFileSize} mensagem={tamanho_maximo_arquivo} />
        <CampoDropzoneErro errors={errors.resolution} mensagem={resolucao_maxima_imagem} />
      </div>}
    </>
  );
}

/*
{errors && <div className="d-flex flex-column">
  <CampoDropzoneErro errors={errors.maxNumber} mensagem={numero_maximo_imagems} />
  <CampoDropzoneErro errors={errors.acceptType} mensagem={tipo_nao_aceito_imagem} />
  <CampoDropzoneErro errors={errors.maxFileSize} mensagem={tamanho_maximo_arquivo} />
  <CampoDropzoneErro errors={errors.resolution} mensagem={resolucao_maxima_imagem} />
</div>}
*/
/*
{errors.maxNumber && <Alert color="danger" className="w-100">
  Numero maximo de imagems atingido. Maximo: {maxNumber}
</Alert>}
{errors.acceptType && <Alert color="danger" className="w-100">
  Tipo não aceito de imagem. Aceitos: {valida_tipos_nao_aceitos}
</Alert>}
{errors.maxFileSize && <Alert color="danger" className="w-100">
  Tamanho maximo de arquivo exedido. Tamanho maximo: {valida_tamanho_imagem} mb
</Alert>}
{/* {errors.resolution && <span>
  Resolução maxima da imagem exedida. Largura maxima: ${resolutionWidth}. Altura maxima: ${resolutionHeight}.
</span>}
*/

// import ImageUploading, { ImageListType } from "react-images-uploading";
// import { GrUpdate } from "react-icons/gr";
// import { MdSystemUpdateAlt } from "react-icons/md";
// import { AiOutlineDelete } from "react-icons/ai";
// import { Alert, Button, ButtonGroup, Card, CardBody, CardFooter, /*CardGroup,*/ CardImg } from "reactstrap";
// import styled from "styled-components";

// interface CampoDropzoneProps {
//   value: ImageListType;
//   onChange: (value: ImageListType, addUpdatedIndex?: number[] | undefined) => void;
//   maxNumber?: number;
//   multiple?: boolean;
//   maxFileSize?: number;
//   acceptType?: string[];
// }

// export function CampoDropzone(props: CampoDropzoneProps) {
//   const { maxNumber, acceptType, maxFileSize } = props;

//   return (
//     <ImageUploading
//       multiple={props.multiple}
//       value={props.value}
//       onChange={props.onChange}
//       maxNumber={props.maxNumber}
//       maxFileSize={props.maxFileSize}
//       acceptType={props.acceptType}
//     >
//       {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => {
//         const validaIsDragging = isDragging ? { color: "red" } : undefined;

//         return (
//           <div className="upload__image-wrapper">
//             <BotaoUploadEstilizado
//               color="light"
//               className="w-100"
//               type="button"
//               style={validaIsDragging}
//               onClick={onImageUpload}
//               {...dragProps}
//             >
//               Click ou Arraste imagens aqui <MdSystemUpdateAlt size={30} />
//             </BotaoUploadEstilizado>
//             &nbsp;
//             <Button
//               color="danger"
//               type="button"
//               className="mt-2"
//               onClick={onImageRemoveAll}
//             >Remover todas as imagens</Button>
//             {errors && <div>
//               {errors.maxNumber && <Alert color="danger" className="w-100">
//                 Numero maximo de imagems atingido. Maximo: {maxNumber}
//               </Alert>}
//               {errors.acceptType && <Alert color="danger" className="w-100">
//                 Tipo não aceito de imagem. Aceitos: {acceptType?.join(',')}
//               </Alert>}
//               {errors.maxFileSize && <Alert color="danger" className="w-100">
//                 Tamanho maximo de arquivo exedido. Tamanho maximo: {(maxFileSize) ? maxFileSize / 1000000 : 0} mb
//               </Alert>}
//               {/* {errors.resolution && <span>
//               Selected file is not match your desired resolution
//             </span>} */}
//             </div>}
//             {/* <CardGroup> */}
//             <div className="d-flex flex-row justify-content-center">
//               {imageList.map((image, index) => (
//                 <CardEstilizado key={index}>
//                   <CardBody className="p-0 m-0 d-flex justify-content-center">
//                     <CardImgEstilizado src={image.dataURL} alt={`imagem-${index}`} />
//                   </CardBody>
//                   <CardFooter className="p-0 m-0">
//                     <ButtonGroup className="w-100">
//                       <Button
//                         className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
//                         color="primary"
//                         type="button"
//                         onClick={() => onImageUpdate(index)}
//                       >
//                         <GrUpdate size={20} className="p-0 m-0" />
//                       </Button>
//                       <Button
//                         className="ps-3 pe-3 pt-2 pb-2 d-flex justify-content-center align-items-center"
//                         color="danger"
//                         type="button"
//                         onClick={() => onImageRemove(index)}
//                       >
//                         <AiOutlineDelete size={20} className="p-0 m-0" />
//                       </Button>
//                     </ButtonGroup>
//                   </CardFooter>
//                 </CardEstilizado>
//               ))}
//             </div>
//             {/* </CardGroup> */}
//           </div>
//         );
//       }}
//     </ImageUploading>
//   );
// }

// const BotaoUploadEstilizado = styled(Button)`
//   height: 200px;
// `;

// const CardEstilizado = styled(Card)`
//   width: 170px !important;
//   margin: 5px !important;
//   height: 210px !important;
// `;

// const CardImgEstilizado = styled(CardImg)`
//   width: 170px !important;
//   height: 170px !important;
// `;