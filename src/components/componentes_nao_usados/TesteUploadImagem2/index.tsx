// import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Titulo } from "../../Titulo";
// import { CampoDropzone2 } from "../../components/Campos/CampoDropzone2";
import { CampoDropzone3 } from "../CampoDropzone3";

export function TesteUploadImagem2() {
  const imagens: File[] = [];

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Teste Upload Imagem 2</Titulo>
        </Col>
        <Col md={12}>
          <CampoDropzone3 imagens={imagens} disabled={false} />
        </Col>
      </Row>
    </Container>
  );
}
