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
  const { md, id, label, name, placeholder, value, error, touched } = props;

  return (
    <Col md={md} className="d-flex flex-column mt-3">
      <Label className="form-label" htmlFor={id}>{label}</Label>
      <Field id={id} name={name} as="textarea"
        className="form-control" placeholder={placeholder} value={value} />
      {error && touched ? (
        <Alert color="danger">{error}</Alert>
      ) : null}
    </Col>
  );
}
