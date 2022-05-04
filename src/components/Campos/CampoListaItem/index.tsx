import { ErrorMessage } from "formik";
import { CampoInput, CampoInputProps } from "../CampoInput";

export interface CampoListaItemProps extends CampoInputProps {
  name_messagem_erro: string;
}

export function CampoListaItem(props: CampoListaItemProps) {
  const { id, name, placeholder, type, value, name_messagem_erro } = props;

  return (
    <div className="d-flex flex-column mb-1">
      <CampoInput
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <ErrorMessage
        name={name_messagem_erro}
        component="span"
        className="text-danger"
      />
    </div>
  );
}
