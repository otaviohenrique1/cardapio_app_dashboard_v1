import { Form, Label } from "reactstrap";

interface QuantidadeItemsPorPaginaProps {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export function QuantidadeItemsPorPagina(props: QuantidadeItemsPorPaginaProps) {
  const listaValoresQuantidadePagina = [10, 20, 30, 40, 50];
  const { pageSize, setPageSize } = props;

  return (
    <Form className="d-flex flex-row align-items-center"
      onSubmit={event => event.preventDefault()}>
      <Label
        for="page_select"
        className="mb-0 me-3 fw-bold form-label"
      >Exibir</Label>
      <Select
        pageSize={pageSize}
        setPageSize={setPageSize}
        data={listaValoresQuantidadePagina}
      />
    </Form>
  );
}

interface SelectProps extends QuantidadeItemsPorPaginaProps {
  data: number[];
}

function Select(props: SelectProps) {
  const { pageSize, setPageSize, data } = props;

  return (
    <select
      className="form-select"
      value={pageSize}
      onChange={event => {
        const numero_pagina = event.target.value;
        setPageSize(Number(numero_pagina))
      }}>
      {data.map((pageSize) => (
        <Item value={pageSize} key={pageSize} />
      ))}
    </select>
  );
}

interface ItemProps {
  value: number;
}

function Item(props: ItemProps) {
  const { value } = props;
  return (
    <option value={value}>{value}</option>
  );
}