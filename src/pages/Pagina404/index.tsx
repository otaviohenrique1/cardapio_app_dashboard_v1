import { Container } from "reactstrap";
import { Titulo } from "../../components/Titulo";

export function Pagina404() {
  return (
    <Container>
      <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column m-5">
        <Titulo tag="h1" className="fw-bold">Erro 404</Titulo>
        <Titulo tag="h2" className="fw-light">Pagina não encontrada</Titulo>
      </div>
    </Container>
  );
}