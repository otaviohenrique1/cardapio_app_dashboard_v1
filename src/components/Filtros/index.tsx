import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAsyncDebounce } from "react-table";
import { Form, Label, InputGroup, InputGroupText, Input } from "reactstrap";

interface CampoFiltroGlobalTabelaProps {
  globalFilter: any;
  setGlobalFilter: any;
}

export function CampoFiltroGlobalTabela(props: CampoFiltroGlobalTabelaProps) {
  const [value, setValue] = useState(props.globalFilter);
  const onChange = useAsyncDebounce(value => {
    props.setGlobalFilter(value || undefined)
  }, 200)

  return (
    <Form className="d-flex flex-row align-items-center" onSubmit={event => event.preventDefault()}>
      <Label for="filter_table" className="mb-0 me-3 fw-bold form-label">Pesquisar</Label>
      <InputGroup>
        <InputGroupText className="rounded-start">
          <FaSearch />
        </InputGroupText>
        <Input
          className="rounded-end"
          type="text"
          id="filter_table"
          value={value || ""}
          onChange={event => {
            setValue(event.target.value);
            onChange(event.target.value);
          }}
          placeholder="Busca"
        />
      </InputGroup>
    </Form>
  );
}
