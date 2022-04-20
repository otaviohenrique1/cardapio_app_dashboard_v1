import { MdPlayArrow } from "react-icons/md";
import { Titulo } from "../../Titulo";

interface ListaIngredientesProps {
  data: IngredientesTypes[];
}

export function ListaIngredientes(props: ListaIngredientesProps) {
  return (
    <div className="d-flex flex-column">
      <Titulo tag="h5" className="w-100">Ingredientes</Titulo>
      {props.data.map((item, index) => {
        return (
          <ItemListaIngredientes data={item} key={index} />
        );
      })}
    </div>
  );
}

interface ItemListaIngredientesProps {
  data: IngredientesTypes;
}

function ItemListaIngredientes(props: ItemListaIngredientesProps) {
  const { nome, quantidade } = props.data;
  const ingrediente = `${(quantidade).toString()} - ${nome}`;

  return (
    <div className="d-flex flex-row justify-content-between">
      <MdPlayArrow size={25} className="me-1" />
      <Titulo tag="h6" className="w-100">{ingrediente}</Titulo>
    </div>
  );
}
