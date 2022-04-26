import { Field } from "formik";
import { Col, Label } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";

interface CampoCheckboxProps {
  name: string;
  checked?: boolean;
  label: string;
  md?: ColumnProps;
  xs?: ColumnProps;
  sm?: ColumnProps;
  lg?: ColumnProps;
  xl?: ColumnProps;
  xxl?: ColumnProps;
}

export function CampoCheckbox(props: CampoCheckboxProps) {
  const { name, checked, label, md, xs, sm, lg, xl, xxl } = props;

  return (
    <Col
      md={md} xs={xs} sm={sm} lg={lg} xl={xl} xxl={xxl}
      className="d-flex flex-row pb-3 mb-3 border-dark border-bottom"
    >
      <Field
        className="form-check"
        type="checkbox"
        name={name}
        checked={checked}
      />
      <Label className="form-label ms-2">{label}</Label>
    </Col>
  );
}
