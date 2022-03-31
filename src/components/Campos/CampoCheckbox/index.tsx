import { Field } from "formik";
import { ReactNode } from "react";
import { Col, Label } from "reactstrap";

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
        checked={props.checked}
      />
      <Label className="form-label ms-2">{props.children}</Label>
    </Col>
  );
}
