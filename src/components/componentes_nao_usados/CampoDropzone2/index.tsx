import { useEffect } from 'react';
import { useState } from 'react';
import { DropzoneOptions, useDropzone, ErrorCode } from 'react-dropzone';
import { MdSystemUpdateAlt } from 'react-icons/md';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
import { Titulo } from '../../Titulo';
// import path from "path";

interface CampoDropzone2Props {
  imagens: File[];
  disabled: boolean;
}

export function CampoDropzone2(props: CampoDropzone2Props) {
  const { imagens, disabled } = props;

  const [previewImagens, setPreviewImagens] = useState<File[]>([]);

  // const formatos_arquivos_aceitos_texto = 'image/jpeg,image/png,image/jpg,image/gif';
  const formatos_arquivos_aceitos_lista = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  const quantidade_maxima_arquivos_aceitos = 3;
  const tamanho_maximo_arquivos_aceitos_em_bytes = 3145728;


  const dropzone_options: DropzoneOptions = {
    disabled,
    accept: formatos_arquivos_aceitos_lista,
    maxFiles: quantidade_maxima_arquivos_aceitos,
    maxSize: tamanho_maximo_arquivos_aceitos_em_bytes,
    onDrop: (acceptedFiles) => {
      setPreviewImagens(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    validator: formatosArquivosAceitosValidator,
  };

  const { /*acceptedFiles,*/ fileRejections, getRootProps, getInputProps, } = useDropzone(dropzone_options);

  useEffect(() => {
    imagens.concat(previewImagens);
  }, [imagens, previewImagens]);

  useEffect(() => {
    previewImagens.forEach(previewImagem => URL.revokeObjectURL(previewImagem.name));
  }, [previewImagens]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <Input {...getInputProps()} />
        <p className="text-center">
          Click ou Arraste imagem(s) aqui <MdSystemUpdateAlt size={30} />
        </p>
      </div>
      {fileRejections.map(
        ({ file, errors }, index) => (
          <ul key={index}>
            {errors.map(error => (
              <li key={error.code}>{error.message}</li>
            ))}
          </ul>
        ))}
      <aside>
        <Titulo tag="h4">Imagem(s)</Titulo>
        {/* <ListGroup>
          {acceptedFiles.map((imagem, index) => (
            <ListGroupItem key={index} className="d-flex flex-column">
              <span className='text-center'>
                {imagem.name} - {imagem.size} bytes
              </span>
            </ListGroupItem>
          ))}
        </ListGroup> */}
        <ListGroup>
          {previewImagens.map((item, index) => {
            return (
              <ListGroupItem key={index} className="d-flex flex-row">
                <img src={item.name} alt={`${index}-${item.name}`} />
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </aside>
    </section>
  );
}

// const thumbsContainer = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   marginTop: 16
// };

// const thumb = {
//   display: 'inline-flex',
//   borderRadius: 2,
//   border: '1px solid #eaeaea',
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: 'border-box'
// };

// const thumbInner = {
//   display: 'flex',
//   minWidth: 0,
//   overflow: 'hidden'
// };

// const img = {
//   display: 'block',
//   width: 'auto',
//   height: '100%'
// };

// function tamanhoMaximoArquivoValidator(file: File) {
//   const tamanho_maximo_em_bytes = 3145728;
//   const message = `Tamanho maximo de arquivo exedido. Tamanho maximo: ${tamanho_maximo_em_bytes} mb`;
//   const code = ErrorCode.FileTooLarge;
//   if (file.size > tamanho_maximo_em_bytes) {
//     return { code, message };
//   }
//   return null
// }

// function quantidadeMaximaArquivosValidator(file: File[]) {
//   const quantidade_maxima_arquivos = 3145728;
//   const message = `Numero maximo de imagems atingido. Maximo: ${quantidade_maxima_arquivos}`;
//   const code = ErrorCode.TooManyFiles;
//   if (file.length > quantidade_maxima_arquivos) {
//     return { code, message };
//   }
//   return null
// }

function formatosArquivosAceitosValidator(file: File) {
  const formatos_arquivos_aceitos = ['jpeg', 'png', 'jpg', 'gif'];
  const message = `Tipo não aceito de imagem. ${formatos_arquivos_aceitos.map((item) => item)}`;
  const code = ErrorCode.FileInvalidType;
  const valida_formato = formatos_arquivos_aceitos.find((item) => {
    return item === file.type
  });

  if (valida_formato) {
    return { code, message };
  }
  return null
}

// accept
// maxFiles
// maxSize

// formatos_arquivos_aceitos_lista
// quantidade_maxima_arquivos_aceitos
// tamanho_maximo_arquivos_aceitos_em_bytes

// function nameLengthValidator(file: File) {
//   const maxLength = 50;
//   if (file.name.length > maxLength) {
//     return {
//       code: "name-too-large",
//       message: `Name is larger than ${maxLength} characters`
//     };
//   }
//   return null
// }