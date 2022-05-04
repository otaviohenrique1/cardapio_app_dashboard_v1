import { ListGroupItem } from "reactstrap";
import { Titulo } from "../../../Titulo";
import { IngredientesOpcionaisLista } from "../../IngredientesOpcionais/IngredientesOpcionaisLista";

interface ItemFichaDadosIngredientesOpcionaisProps {
  data: IngredientesOpcionaisTypes[]
}

export function ItemFichaDadosIngredientesOpcionais(props: ItemFichaDadosIngredientesOpcionaisProps) {
  const { data } = props;

  return (
    <ListGroupItem>
      {(data.length === 0)
        ? <Titulo tag="h5">Lista vazia</Titulo>
        : <IngredientesOpcionaisLista data={data} />
      }
    </ListGroupItem>
  );
}