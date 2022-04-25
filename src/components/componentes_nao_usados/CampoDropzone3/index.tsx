import Dropzone from 'react-dropzone';
import { MdSystemUpdateAlt } from 'react-icons/md';
import { Input, /*ListGroup, ListGroupItem*/ } from 'reactstrap';
import { Titulo } from '../../Titulo';
import { FileWithPath } from "file-selector";
import { useState } from 'react';
import { CSSProperties } from 'styled-components';

interface CampoDropzone3Props {
  imagens: File[];
  disabled: boolean;
}

export function CampoDropzone3(props: CampoDropzone3Props) {
  const { /*imagens,*/ disabled } = props;
  // imagens.concat(acceptedFiles);

  const [data, setData] = useState<FileWithPath[]>([]);

  const formatos_arquivos_aceitos_lista = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  const quantidade_maxima_arquivos_aceitos = 3;
  const tamanho_maximo_arquivos_aceitos_em_bytes = 3145728;

  return (
    <Dropzone
      disabled={disabled}
      // onDrop={(files) => console.log(files)}
      accept={formatos_arquivos_aceitos_lista}
      maxFiles={quantidade_maxima_arquivos_aceitos}
      maxSize={tamanho_maximo_arquivos_aceitos_em_bytes}
      multiple={true}
      onDrop={(files: FileWithPath[]) => {
        setData(files);
      }}
    >
      {({ /*acceptedFiles,*/ getRootProps, getInputProps }) => {
        return (
          <>
            <div {...getRootProps({ className: 'dropzone' })}>
              <Input {...getInputProps()} />
              <Titulo tag="h5" className="text-center">
                Click ou Arraste imagem(s) aqui <MdSystemUpdateAlt size={30} />
              </Titulo>
            </div>
            {/* <ListGroup>
              {acceptedFiles.map((imagem, index) => (
                <ListGroupItem key={index} className="d-flex flex-column">
                  <span className='text-center'>
                    {imagem.name} - {imagem.size} bytes
                  </span>
                </ListGroupItem>
              ))}
            </ListGroup> */}
            <aside style={thumbsContainer}>
              {data.map((file, index) => (
                <div style={thumb} key={file.name}>
                  <div style={thumbInner}>
                    <img
                      src={file.path}
                      alt={`${index}-${file.name}`}
                      style={img}
                    />
                  </div>
                </div>
              ))}
            </aside>
          </>
        )
      }}
    </Dropzone>
  );
}

const thumbsContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb: CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner: CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img: CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
