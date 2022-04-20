import { Row } from "react-table";
import { TbodyTd } from "../TbodyTd";

interface TabelaTbodyTrProps {
  row: Row<TabelaTypes>;
}
export function TbodyTr(props: TabelaTbodyTrProps) {
  const { getRowProps, cells } = props.row;

  return (
    <tr {...getRowProps()} className="bg-light">
      {cells.map((cell, index) => {
        return (
          <TbodyTd cell={cell} key={index} />
        );
      })}
    </tr>
  );
}
