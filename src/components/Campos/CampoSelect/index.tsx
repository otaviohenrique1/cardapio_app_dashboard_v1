import { Field } from "formik";

export interface CampoSelectItemBaseTypes {
  valor: string | number;
  texto: string | number;
}

export interface CampoSelectProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  data: CampoSelectItemBaseTypes[];
  label_item_vazio: string;
}

export function CampoSelect(props: CampoSelectProps) {
  const { id, name, value, placeholder, data, label_item_vazio } = props;

  return (
    <Field
      className="form-select"
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      as="select"
    >
      <option value="">{label_item_vazio}</option>
      {data.map((item, index) => {
        const { valor, texto } = item;
        return (
          <option key={index} value={valor}>{texto}</option>
        );
      })}
    </Field>
  );
}
