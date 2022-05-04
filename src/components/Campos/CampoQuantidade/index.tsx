import { Col, Row } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";
import { lista_unidade_quantidade } from "../../../utils/listas";
import { CampoErro } from "../CampoErro";
import { CampoInput } from "../CampoInput";
import { CampoSelect } from "../CampoSelect";
import { LabelCampoInput } from "../LabelCampoInput";

export interface CampoQuantidadeProps {
  md: ColumnProps;
  quantidade: number | string;
  unidade_quantidade: string;
  errors_quantidade: any;
  touched_quantidade: any;
  errors_unidade_quantidade: any;
  touched_unidade_quantidade: any;
}

export function CampoQuantidade(props: CampoQuantidadeProps) {
  const { md, quantidade, errors_quantidade, touched_quantidade, unidade_quantidade,
    errors_unidade_quantidade, touched_unidade_quantidade } = props;
  
  return (
    <Col md={md} className="mt-3">
      <Row className="m-0 p-0">
        <Col md={6} className="d-flex flex-column">
          <LabelCampoInput htmlFor="quantidade" label="Quantidade da refeição"/>
          <CampoInput id="quantidade" name="quantidade" type="number"
            value={String(quantidade)} placeholder="Digite o nome da refeição" />
          <CampoErro error={errors_quantidade} touched={touched_quantidade} />
        </Col>
        <Col md={6} className="d-flex flex-column">
          <CampoSelect id={"unidade_quantidade"} name={"unidade_quantidade"}
            value={unidade_quantidade} placeholder="Unidade quantidade"
            data={lista_unidade_quantidade} label_item_vazio="Selecione" />
          <CampoErro error={errors_unidade_quantidade} touched={touched_unidade_quantidade} />
        </Col>
      </Row>
    </Col>
  );
}
