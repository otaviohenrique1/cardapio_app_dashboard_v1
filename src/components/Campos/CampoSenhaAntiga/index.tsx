import { Col, Label, Input } from "reactstrap";

interface CampoSenhaAntigaProps {
  senha_antiga: string;
}

export function CampoSenhaAntiga(props: CampoSenhaAntigaProps) {
  const { senha_antiga } = props;

  return (
    <Col md={12} className="d-flex flex-column mt-3">
      <Label className="form-label" htmlFor="senha_antiga">Senha antiga</Label>
      <Input disabled={true} value={senha_antiga} id="senha_antiga" />
    </Col>
  );
}