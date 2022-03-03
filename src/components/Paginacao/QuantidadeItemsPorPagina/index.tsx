import { Form, Label } from "reactstrap";

interface QuantidadeItemsPorPaginaProps {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export function QuantidadeItemsPorPagina(props: QuantidadeItemsPorPaginaProps) {
  const listaValoresQuantidadePagina = [10, 20, 30, 40, 50];

  return (
    <Form className="d-flex flex-row align-items-center"
      onSubmit={event => event.preventDefault()}>
      <Label for="page_select" className="mb-0 me-3 fw-bold form-label">Exibir</Label>
      <select
        value={props.pageSize}
        onChange={event => {
          props.setPageSize(Number(event.target.value))
        }}>
        {listaValoresQuantidadePagina.map((pageSize) => (
          <option value={pageSize} key={pageSize}>{pageSize}</option>
        ))}
      </select>
    </Form>
  );
}