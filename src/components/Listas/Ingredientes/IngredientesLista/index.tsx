import { Titulo } from "../../../Titulo";
import { IngredientesItem } from "../IngredientesItem";

interface IngredientesListaProps {
  data: IngredientesTypes[];
}

export function IngredientesLista(props: IngredientesListaProps) {
  const { data } = props;

  return (
    <div className="d-flex flex-column">
      <Titulo tag="h5" className="w-100">Ingredientes</Titulo>
      {data.map((item, index) => {
        return (
          <IngredientesItem data={item} key={index} />
        );
      })}
    </div>
  );
}

