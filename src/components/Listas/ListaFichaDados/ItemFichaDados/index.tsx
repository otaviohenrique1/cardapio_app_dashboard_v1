import { ListGroupItem } from "reactstrap";
import { Titulo } from "../../../Titulo";

interface ItemFichaDadosProps {
  titulo: string;
  valor: string | number | boolean;
}

export function ItemFichaDados(props: ItemFichaDadosProps) {
  const { titulo, valor } = props;

  return (
    <ListGroupItem className="d-flex flex-row justify-content-between">
      <Titulo tag="h5" className="w-100">{titulo}</Titulo>
      <Titulo tag="h6" className="w-100">{valor}</Titulo>
    </ListGroupItem>
  );
}
