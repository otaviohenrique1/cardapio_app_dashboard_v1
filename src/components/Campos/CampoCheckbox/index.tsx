import { Field } from "formik";
import { ReactNode } from "react";
import { Col, Label } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";

interface CampoCheckboxProps {
  name: string;
  children: ReactNode;
  checked?: boolean;
  md?: ColumnProps;
}

export function CampoCheckbox(props: CampoCheckboxProps) {
  const { name, checked, md, children } = props;

  return (
    <Col md={md || 12} className="d-flex flex-row">
      <Field
        className="form-check"
        type="checkbox"
        name={name}
        checked={checked}
      />
      <Label className="form-label ms-2">{children}</Label>
    </Col>
  );
}
