import { ReactNode } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { HeaderPropGetter, TableHeaderProps, TableSortByToggleProps } from "react-table";

interface TheadThProps {
  getHeaderProps: (propGetter?: HeaderPropGetter<TabelaTypes> | undefined) => TableHeaderProps;
  getSortByToggleProps: (props?: Partial<TableSortByToggleProps> | undefined) => TableSortByToggleProps;
  render: (type: string, props?: object | undefined) => ReactNode;
  isSorted: boolean;
  isSortedDesc?: boolean;
}
export function TheadTh(props: TheadThProps) {
  const { getHeaderProps, getSortByToggleProps, render, isSorted, isSortedDesc } = props;
  const validaIsSortedDesc = isSortedDesc ? <FaSortDown /> : <FaSortUp />;
  const validaIsSorted = isSorted ? validaIsSortedDesc : '';

  return (
    <th {...getHeaderProps(getSortByToggleProps())}>
      {render('Header')}
      <span>{validaIsSorted}</span>
    </th>
  );
}
