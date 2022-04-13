import { Field } from "formik";
import { Col, Label, Alert } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";

interface CampoInputProps {
  md: ColumnProps;
  label: string;
  id: string;
  name: string;
  type: CampoInputTypes;
  value: string;
  placeholder: string;
  error?: any;
  touched?: any;
}

export function CampoInput(props: CampoInputProps) {
  return (
    <Col md={props.md} className="d-flex flex-column mt-3">
      <Label className="form-label" htmlFor={props.id}>{props.label}</Label>
      <Field className="form-control" id={props.id} name={props.name}
        type={props.type} value={props.value} placeholder={props.placeholder} />
      {props.error && props.touched ? (<Alert color="danger">{props.error}</Alert>) : null}
    </Col>
  );
}