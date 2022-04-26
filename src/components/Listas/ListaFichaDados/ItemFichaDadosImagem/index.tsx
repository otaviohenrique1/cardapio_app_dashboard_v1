import { ListGroupItem } from "reactstrap";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { CarouselFotosSemAnimacao } from "../../../Carousel/CarouselFotosSemAnimacao";
import { Titulo } from "../../../Titulo";
import styled from "styled-components";

interface ItemFichaDadosImagemProps {
  data: FotoTypes[];
}

export function ItemFichaDadosImagem(props: ItemFichaDadosImagemProps) {
  const { data } = props;
  
  return (
    <ListGroupItemEstilizado className="d-flex flex-column">
      <Titulo tag="h5" className="mb-1 w-100 text-center">Galeria de fotos</Titulo>
      <div className="d-flex justify-content-center">
        {(data.length === 0)
          ? <MdOutlineImageNotSupported size={100} />
          : (data.length === 1) 
            ? <Imagem data={data[0]} />
            : <CarouselFotosSemAnimacao data={data} />
        }
      </div>
    </ListGroupItemEstilizado>
  );
}

interface ImagemProps {
  data: FotoTypes;
}

function Imagem(props: ImagemProps) {
  const { id, url, nome } = props.data;
  const alt = `Slide-${id}-1`;

  return (
    <Img alt={alt} src={`${url}${nome}`} />
  );
}

const Img = styled.img`
  width: 300px;
`;

const ListGroupItemEstilizado = styled(ListGroupItem)`
  height: 350px;
`;
