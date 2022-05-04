import { Titulo } from "../../../Titulo";
import { IngredientesOpcionaisItem } from "../IngredientesOpcionaisItem";

interface IngredientesOpcionaisListaProps {
  data: IngredientesOpcionaisTypes[];
}

export function IngredientesOpcionaisLista(props: IngredientesOpcionaisListaProps) {
  const { data } = props;

  return (
    <div className="d-flex flex-column">
      <Titulo tag="h5" className="w-100">Ingredientes Opcionais</Titulo>
      {data.map((item, index) => {
        return (
          <IngredientesOpcionaisItem data={item} key={index} />
        );
      })}
    </div>
  );
}

