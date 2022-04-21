import { ListGroupItem } from "reactstrap";
import { Titulo } from "../../../Titulo";
import { IngredientesLista } from "../../Ingredientes/IngredientesLista";

interface ItemFichaDadosIngredientesProps {
  data: IngredientesTypes[]
}

export function ItemFichaDadosIngredientes(props: ItemFichaDadosIngredientesProps) {
  const { data } = props;

  return (
    <ListGroupItem>
      {(data.length === 0)
        ? <Titulo tag="h5">Lista vazia</Titulo>
        : <IngredientesLista data={data} />
      }
    </ListGroupItem>
  );
}