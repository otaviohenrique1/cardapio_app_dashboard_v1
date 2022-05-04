import { Label } from "reactstrap";

interface LabelCampoInputProps {
  htmlFor: string;
  label: string;
}

export function LabelCampoInput(props: LabelCampoInputProps) {
  const { htmlFor, label } = props;
  return (
    <Label className="form-label" htmlFor={htmlFor}>{label}</Label>
  );
}
