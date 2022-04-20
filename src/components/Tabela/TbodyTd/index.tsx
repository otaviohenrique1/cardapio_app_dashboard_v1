import { Cell } from "react-table";

interface TabelaTbodyTdProps {
  cell: Cell<TabelaTypes, any>;
}
export function TbodyTd(props: TabelaTbodyTdProps) {
  const { getCellProps, render } = props.cell;

  return (
    <td {...getCellProps()}>
      {render('Cell')}
    </td>
  );
}
