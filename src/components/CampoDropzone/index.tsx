import { useDropzone } from "react-dropzone";
import { ListGroup, ListGroupItem } from "reactstrap";
import styled from "styled-components";
import { Titulo } from "../Titulo";

interface CampoDropzoneProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  imagens: File[];
}

export function CampoDropzone(props: CampoDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      props.setFieldValue("files", acceptedFiles);
    }
  });

  return (
    <DropzoneArea {...getRootProps({ className: "dropzone" })}>
      <DropzoneInputArea {...getInputProps()} />
      {isDragActive ? (
        <Titulo tag="h6" className="w-100 text-center">Solte os arquivos aqui ...</Titulo>
      ) : (
        <Titulo tag="h6" className="w-100 text-center">Arraste e solte alguns arquivos aqui ou clique para selecionar os arquivos</Titulo>
      )}
      <ListGroup className="w-100">
        {props.imagens && props.imagens.map((imagem, index) => (
          <ListGroupItem
            key={index}
            className="d-flex flex-row w-100"
          >
            <span>{`Nome: ${imagem.name}`}</span>
            <span className="me-2 ms-2">{`Tipo: ${imagem.type}`}</span>
            <span>{`Tamanho:${imagem.size} bytes`}</span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </DropzoneArea>
  );
}

// const ListGroupItemEstilizado = styled(ListGroupItem)`
//   list-style: none;
// `;

const DropzoneInputArea = styled.input``;

const DropzoneArea = styled.div`
  width: 100%;
`;