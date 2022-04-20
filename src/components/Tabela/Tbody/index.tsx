import { Row, TableBodyPropGetter, TableBodyProps } from "react-table";
import { TbodyTr } from "../TbodyTr";
import { TabelaVazia } from "../TabelaVazia";

interface TbodyProps {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<TabelaTypes> | undefined) => TableBodyProps;
  page: Row<TabelaTypes>[];
  prepareRow: (row: Row<TabelaTypes>) => void;
}
export function Tbody(props: TbodyProps) {
  const { getTableBodyProps, page, prepareRow } = props;

  return (
    <tbody {...getTableBodyProps()}>
      {(page.length === 0)
        ? <TabelaVazia colSpan={7} />
        : page.slice(0, 20).map((row, index) => {
          prepareRow(row);
          return (
            <TbodyTr row={row} key={index} />
          );
        })}
    </tbody>
  );
}
