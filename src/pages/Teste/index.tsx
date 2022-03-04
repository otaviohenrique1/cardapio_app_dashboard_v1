import { useState } from "react";
import { Button, Container, Form, Input } from "reactstrap";
import { gerarSalt, sha512 } from "../../utils/utils";

export function Teste() {
  const [valor, setValor] = useState<string>('');
  const [resultadoSha512, setResultadoSha512] = useState<string>('------');
  const [resultadoSalt, setResultadoSalt] = useState<string>('------');

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <div className="w-100 text-center mt-1 border">
        <h4>Resultado sha512</h4><br />
        <h5>{resultadoSha512}</h5>
      </div>
      <div className="w-100 text-center mt-1 border">
        <h4>Resultado Salt</h4><br />
        <h5>{resultadoSalt}</h5>
      </div>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setResultadoSha512(sha512(valor));
          setResultadoSalt(gerarSalt());
        }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <Input
          className="form-control"
          value={valor}
          onChange={(event) => setValor(event.target.value)}
        />
        <div className="d-flex flex-row align-items-center justify-content-center">
          <Button
            color="primary"
            type="submit"
          >Converter</Button>
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setResultadoSha512('------');
              setResultadoSalt('------');
              setValor('');
            }}
          >Limpar</Button>
        </div>
      </Form>
    </Container>
  );
}