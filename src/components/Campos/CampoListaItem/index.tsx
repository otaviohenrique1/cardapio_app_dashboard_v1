import { ErrorMessage, Field } from "formik";

export interface CampoListaItemProps {
  name: string;
  placeholder: string;
  type: CampoInputTypes;
  value: string;
  name_messagem_erro: string;
}

export function CampoListaItem(props: CampoListaItemProps) {
  const { name, placeholder, type, value, name_messagem_erro } = props;

  return (
    <div className="d-flex flex-column mb-1">
      <Field
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        className="form-control"
      />
      <ErrorMessage
        name={name_messagem_erro}
        component="span"
        className="text-danger"
      />
    </div>
  );
}
