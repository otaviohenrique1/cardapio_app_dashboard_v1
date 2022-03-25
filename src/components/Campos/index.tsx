import { Alert, Col, Label } from "reactstrap";
import { Field } from "formik";
import { ColumnProps } from "reactstrap/types/lib/Col";
import { ReactNode } from "react";

interface CampoInputProps {
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

interface CampoCheckboxProps {
  name: string;
  children: ReactNode;
  checked?: boolean;
}

export function CampoCheckbox(props: CampoCheckboxProps) {
  return (
    <Col md={12} className="d-flex flex-row">
      <Field
        className="form-check"
        type="checkbox"
        name={props.name}
      />
      <Label className="form-label ms-2">{props.children}</Label>
    </Col>
  );
}
