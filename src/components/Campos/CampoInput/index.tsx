import { Field } from "formik";
import { Col, Label, Alert } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";

export interface CampoInputProps {
  label: string;
  id: string;
  name: string;
  type: CampoInputTypes;
  value: string;
  placeholder: string;
  error?: any;
  touched?: any;
  md: ColumnProps;
  xs?: ColumnProps;
  sm?: ColumnProps;
  lg?: ColumnProps;
  xl?: ColumnProps;
  xxl?: ColumnProps;
}

export function CampoInput(props: CampoInputProps) {
  const { id, label, name, type, value, placeholder, error, touched, md, xs, sm, lg, xl, xxl } = props;

  return (
    <Col md={md} xs={xs} sm={sm} lg={lg} xl={xl} xxl={xxl} className="d-flex flex-column mt-3">
      <Label className="form-label" htmlFor={id}>{label}</Label>
      <Field className="form-control" id={id} name={name}
        type={type} value={value} placeholder={placeholder} />
      {error && touched ? (
        <Alert color="danger">{error}</Alert>
      ) : null}
    </Col>
  );
}