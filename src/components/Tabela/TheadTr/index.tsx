import { HeaderGroup, HeaderGroupPropGetter, TableHeaderProps } from "react-table";
import { TheadTh } from "../TheadTh";

interface TheadTrProps {
  getHeaderGroupProps: (propGetter?: HeaderGroupPropGetter<TabelaTypes> | undefined) => TableHeaderProps;
  headers: HeaderGroup<TabelaTypes>[];
}
export function TheadTr(props: TheadTrProps) {
  const { getHeaderGroupProps, headers } = props;

  return (
    <tr {...getHeaderGroupProps()}>
      {headers.map((column, index) => {
        const { getHeaderProps, getSortByToggleProps, render, isSorted, isSortedDesc } = column;

        return (
          <TheadTh
            key={index}
            getHeaderProps={getHeaderProps}
            getSortByToggleProps={getSortByToggleProps}
            render={render}
            isSorted={isSorted}
            isSortedDesc={isSortedDesc} />
        );
      })}
    </tr>
  );
}
