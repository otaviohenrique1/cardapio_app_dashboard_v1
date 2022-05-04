import { Field } from "formik";
import Col, { ColumnProps } from "reactstrap/types/lib/Col";
import { CampoErro } from "../CampoErro";
import { LabelCampoInput } from "../LabelCampoInput";

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

export interface CampoSelectPropsComErroProps extends CampoSelectProps {
  label: string;
  data: CampoSelectItemBaseTypes[];
  error?: any;
  touched?: any;
  md: ColumnProps;
  xs?: ColumnProps;
  sm?: ColumnProps;
  lg?: ColumnProps;
  xl?: ColumnProps;
  xxl?: ColumnProps;
}

export function CampoSelectComErro(props: CampoSelectPropsComErroProps) {
  const { id, label, data, name, value, placeholder,
    label_item_vazio, error, touched, md, xs, sm, lg, xl, xxl } = props;

  return (
    <Col md={md} xs={xs} sm={sm} lg={lg} xl={xl} xxl={xxl} className="d-flex flex-column mt-3">
      <LabelCampoInput htmlFor={id} label={label} />
      <CampoSelect id={id} name={name}
        value={value} placeholder={placeholder}
        data={data} label_item_vazio={label_item_vazio} />
      <CampoErro error={error} touched={touched} />
    </Col>
  );
}