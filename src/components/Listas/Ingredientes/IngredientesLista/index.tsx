import { Titulo } from "../../../Titulo";
import { IngredientesItem } from "../IngredientesItem";

interface IngredientesListaProps {
  data: IngredientesTypes[];
}

export function IngredientesLista(props: IngredientesListaProps) {
  return (
    <div className="d-flex flex-column">
      <Titulo tag="h5" className="w-100">Ingredientes</Titulo>
      {props.data.map((item, index) => {
        return (
          <IngredientesItem data={item} key={index} />
        );
      })}
    </div>
  );
}

