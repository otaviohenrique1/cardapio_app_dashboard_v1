import { ListGroupItem } from "reactstrap";
import { Titulo } from "../Titulo";

interface ItemListaFichaDadosProps {
  titulo: string;
  valor: any;
}

export function ItemListaFichaDados(props: ItemListaFichaDadosProps) {
  return (
    <ListGroupItem className="d-flex flex-row justify-content-between">
      <Titulo tag="h5" className="w-100">{props.titulo}</Titulo>
      <Titulo tag="h6" className="w-100">{props.valor}</Titulo>
    </ListGroupItem>
  );
}
