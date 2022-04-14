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
      <Label
        for="page_select"
        className="mb-0 me-3 fw-bold form-label"
      >Exibir</Label>
      <Select
        pageSize={props.pageSize}
        setPageSize={props.setPageSize}
        data={listaValoresQuantidadePagina}
      />
    </Form>
  );
}

interface SelectProps extends QuantidadeItemsPorPaginaProps {
  data: number[];
}

function Select(props: SelectProps) {
  return (
    <select
      className="form-select"
      value={props.pageSize}
      onChange={event => {
        const numero_pagina = event.target.value;
        props.setPageSize(Number(numero_pagina))
      }}>
      {props.data.map((pageSize) => (
        <Item value={pageSize} key={pageSize} />
      ))}
    </select>
  );
}

interface ItemProps {
  value: number;
}

function Item(props: ItemProps) {
  return (
    <option value={props.value}>{props.value}</option>
  );
}