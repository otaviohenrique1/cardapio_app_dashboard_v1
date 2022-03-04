import { Container } from "reactstrap";
import { decrypt, encrypt } from "../../utils/script2";

export function Teste() {
  return (
    <Container>
      <h5 className="w-100 text-center mt-1 border">
        {encrypt('0123456789', '987654321').toString()}
      </h5>
      <br />
      <h5 className="w-100 text-center mt-1 border">
        {decrypt(encrypt('0123456789', '987654321'), '987654321').toString()}
      </h5>
    </Container>
  );
}