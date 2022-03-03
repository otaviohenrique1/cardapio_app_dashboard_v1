import { Input } from "reactstrap";

interface IrParaPaginaProps {
  pageIndex: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
}

export function IrParaPagina(props: IrParaPaginaProps) {
  return (
    <div className="d-flex justify-content-end align-items-center flex-row ms-3">
      <p className="w-100 mb-0 me-2 text-end">Ir para a pagina</p>
      <Input
        type="number"
        defaultValue={props.pageIndex + 1}
        onChange={event => {
          const pagina = event.target.value ? Number(event.target.value) - 1 : 0
          props.gotoPage(pagina)
        }}
      />
    </div>
  );
}
