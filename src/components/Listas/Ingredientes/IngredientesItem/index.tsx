import { MdPlayArrow } from "react-icons/md";
import { Titulo } from "../../../Titulo";

interface IngredientesItemProps {
  data: IngredientesTypes;
}

export function IngredientesItem(props: IngredientesItemProps) {
  const { nome, quantidade } = props.data;
  const valida_se_quantidade_maior_que_1 = (quantidade > 1) ? "(s)" : "";
  const ingrediente = `${(quantidade).toString()} ${nome}${valida_se_quantidade_maior_que_1}`;

  return (
    <div className="d-flex flex-row justify-content-between">
      <MdPlayArrow size={25} className="me-1" />
      <Titulo tag="h6" className="w-100">{ingrediente}</Titulo>
    </div>
  );
}
