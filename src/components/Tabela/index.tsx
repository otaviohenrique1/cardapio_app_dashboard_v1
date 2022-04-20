import { ReactNode } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { Cell, HeaderGroup, HeaderGroupPropGetter, HeaderPropGetter, Row, TableBodyPropGetter, TableBodyProps, TableHeaderProps, TablePropGetter, TableProps, TableSortByToggleProps } from "react-table";
import { Col, Table } from "reactstrap";

interface TabelaProps {
  getTableProps: (propGetter?: TablePropGetter<TabelaTypes> | undefined) => TableProps;
  headerGroups: HeaderGroup<TabelaTypes>[];
  getTableBodyProps: (propGetter?: TableBodyPropGetter<TabelaTypes> | undefined) => TableBodyProps;
  page: Row<TabelaTypes>[];
  prepareRow: (row: Row<TabelaTypes>) => void;
}

export function Tabela(props: TabelaProps) {
  const { getTableProps, headerGroups, getTableBodyProps, page, prepareRow } = props;

  return (
    <Col md={12}>
      <Table {...getTableProps()}>
        <TabelaThead headerGroups={headerGroups} />
        <TabelaTbody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
        />
      </Table>
    </Col>
  );
}

interface TabelaTheadProps {
  headerGroups: HeaderGroup<TabelaTypes>[];
}

function TabelaThead(props: TabelaTheadProps) {
  const { headerGroups } = props;

  return (
    <thead>
      {headerGroups.map(headerGroup => {
        const { getHeaderGroupProps, headers } = headerGroup;
        return (
          <TabelaTheadTr getHeaderGroupProps={getHeaderGroupProps} headers={headers} />
        );
      })}
    </thead>
  );
}

interface TabelaTheadTrProps {
  getHeaderGroupProps: (propGetter?: HeaderGroupPropGetter<TabelaTypes> | undefined) => TableHeaderProps;
  headers: HeaderGroup<TabelaTypes>[];
}

function TabelaTheadTr(props: TabelaTheadTrProps) {
  const { getHeaderGroupProps, headers } = props;

  return (
    <tr {...getHeaderGroupProps()}>
      {headers.map(column => {
        const { getHeaderProps, getSortByToggleProps, render, isSorted, isSortedDesc } = column;

        return (
          <TabelaTheadTh
            getHeaderProps={getHeaderProps}
            getSortByToggleProps={getSortByToggleProps}
            render={render}
            isSorted={isSorted}
            isSortedDesc={isSortedDesc}
          />
        );
      })}
    </tr>
  );
}

interface TabelaTheadThProps {
  getHeaderProps: (propGetter?: HeaderPropGetter<TabelaTypes> | undefined) => TableHeaderProps;
  getSortByToggleProps: (props?: Partial<TableSortByToggleProps> | undefined) => TableSortByToggleProps;
  render: (type: string, props?: object | undefined) => ReactNode;
  isSorted: boolean;
  isSortedDesc?: boolean;
}

function TabelaTheadTh(props: TabelaTheadThProps) {
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

interface TabelaTbodyProps {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<TabelaTypes> | undefined) => TableBodyProps;
  page: Row<TabelaTypes>[];
  prepareRow: (row: Row<TabelaTypes>) => void;
}

function TabelaTbody(props: TabelaTbodyProps) {
  const { getTableBodyProps, page, prepareRow } = props;

  return (
    <tbody {...getTableBodyProps()}>
      {(page.length === 0)
        ? <TabelaVazia />
        : page.slice(0, 20).map((row, i) => {
          prepareRow(row);
          return (
            <TabelaTbodyTr row={row} />
          )
        })}
    </tbody>
  )
}

interface TabelaTbodyTrProps {
  row: Row<TabelaTypes>
}

function TabelaTbodyTr(props: TabelaTbodyTrProps) {
  const { getRowProps, cells } = props.row;

  return (
    <tr {...getRowProps()} className="bg-light">
      {cells.map(cell => {
        return (
          <TabelaTbodyTd cell={cell} />
        );
      })}
    </tr>
  );
}

interface TabelaTbodyTdProps {
  cell: Cell<TabelaTypes, any>;
}

function TabelaTbodyTd(props: TabelaTbodyTdProps) {
  const { getCellProps, render } = props.cell;

  return (
    <td {...getCellProps()}>
      {render('Cell')}
    </td>
  );
}

function TabelaVazia() {
  return (
    <tr className="bg-light">
      <td colSpan={7} className="text-center h1 p-5">Lista Vazia</td>
    </tr>
  );
}