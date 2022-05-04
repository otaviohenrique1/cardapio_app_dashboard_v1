import { Field } from "formik";
import { Col, Alert } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";
import { InputType } from "reactstrap/types/lib/Input";
import { LabelCampoInput } from "../LabelCampoInput";

export interface CampoInputComErroProps extends CampoInputProps {
  label: string;
  error?: any;
  touched?: any;
  md: ColumnProps;
  xs?: ColumnProps;
  sm?: ColumnProps;
  lg?: ColumnProps;
  xl?: ColumnProps;
  xxl?: ColumnProps;
}

export function CampoInputComErro(props: CampoInputComErroProps) {
  const { id, label, name, type, value, placeholder, error, touched, md, xs, sm, lg, xl, xxl } = props;

  return (
    <Col md={md} xs={xs} sm={sm} lg={lg} xl={xl} xxl={xxl} className="d-flex flex-column mt-3">
      <LabelCampoInput htmlFor={id} label={label} />
      <CampoInput id={id} name={name}
        type={type} value={value} placeholder={placeholder} />
      {error && touched ? (
        <Alert color="danger">{error}</Alert>
      ) : null}
    </Col>
  );
}

export interface CampoInputProps {
  id: string;
  name: string;
  type: InputType;
  value: string;
  placeholder: string;
}

export function CampoInput(props: CampoInputProps) {
  const { id, name, type, value, placeholder } = props;

  return (
    <Field className="form-control" id={id} name={name}
      type={type} value={value} placeholder={placeholder} />
  );
}