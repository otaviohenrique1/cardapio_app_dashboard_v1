import { Field } from "formik";
import { Label, Alert, Col } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";

interface CampoTextAreaProps {
  md: ColumnProps;
  label: string;
  id: string;
  name: string;
  value: string;
  placeholder: string;
  error?: any;
  touched?: any;
}

export function CampoTextArea(props: CampoTextAreaProps) {
  return (
    <Col md={props.md} className="d-flex flex-column mt-3">
      <Label className="form-label" htmlFor={props.id}>{props.label}</Label>
      <Field id={props.id} name={props.name} as="textarea"
        className="form-control" placeholder={props.placeholder} value={props.value} />
      {props.error && props.touched ? (<Alert color="danger">{props.error}</Alert>) : null}
    </Col>
  );
}
