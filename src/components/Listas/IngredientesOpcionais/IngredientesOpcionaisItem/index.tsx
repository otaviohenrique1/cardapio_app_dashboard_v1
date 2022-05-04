import { MdPlayArrow } from "react-icons/md";
import { FormatadorDados } from "../../../../utils/FormatadorDados";
import { Titulo } from "../../../Titulo";

interface IngredientesOpcionaisItemProps {
  data: IngredientesOpcionaisTypes;
}

export function IngredientesOpcionaisItem(props: IngredientesOpcionaisItemProps) {
  const { nome, preco } = props.data;
  const preco_formatado = FormatadorDados.FormataValorMonetarioTexto(preco);
  const ingredientes_opcionais_item = `${nome} (R$ ${preco_formatado})`;
  return (
    <div className="d-flex flex-row justify-content-between">
      <MdPlayArrow size={25} className="me-1" />
      <Titulo tag="h6" className="w-100">{ingredientes_opcionais_item}</Titulo>
    </div>
  );
}
