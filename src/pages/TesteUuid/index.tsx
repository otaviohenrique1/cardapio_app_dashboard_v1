import { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { ContainerApp } from "../../components/ContainerApp";
import { Titulo } from "../../components/Titulo";
// import { v1 as uuidv1 } from "uuid";
// import { v3 as uuidv3, } from "uuid";
import { v4 as uuidv4, } from "uuid";
// import { v5 as uuidv5 } from "uuid";

export function TesteUuid() {
  const [valor, setValor] = useState<string>('0');

  function geraUuid() {
    // let numeroUuidV1 = uuidv1();
    // let numeroUuidV3 = uuidv3('0123456789', '1b671a64-40d5-491e-99b0-da01ff1f3341');
    let numeroUuidV4 = uuidv4();
    // let numeroUuidV5 = uuidv5('0123456789', '1b671a64-40d5-491e-99b0-da01ff1f3341');
    setValor(numeroUuidV4);
  }

  function limpaCampo() {
    setValor('0');
  }

  return (
    <ContainerApp>
      <Row className="m-5 w-100">
        <Col md={12}>
          <Titulo tag="h1">Teste uuid</Titulo>
        </Col>
        <Col md={12} className="mt-5 mb-5 border border-1 rounded-3 p-3">
          <Titulo tag="h3" className="w-100 text-center">{valor}</Titulo>
        </Col>
        <Col md={12} className="d-flex justify-content-center">
          <ButtonGroup>
            <Button type="button" color="primary" onClick={geraUuid}>Gerar</Button>
            <Button type="button" color="danger" onClick={limpaCampo}>Limpar</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </ContainerApp>
  );
}