import { Alert, Col, Label } from "reactstrap";
import { Field } from "formik";
import { ColumnProps } from "reactstrap/types/lib/Col";

interface CampoFormularioCadastroProps {
  md: ColumnProps;
  label: string;
  id: string;
  name: string;
  type: "text" | "number" | "email" | "password";
  value: string;
  placeholder: string;
  error?: any;
  touched?: any;
}

export function CampoFormularioCadastro(props: CampoFormularioCadastroProps) {
  return (
    <Col md={props.md} className="d-flex flex-column">
      <Label className="form-label" htmlFor={props.id}>{props.label}</Label>
      <Field  className="form-control" id={props.id} name={props.name}
        type={props.type} value={props.value} placeholder={props.placeholder} />
      {props.error && props.touched ? (<Alert color="danger">{props.error}</Alert>) : null}
    </Col>
  );
}