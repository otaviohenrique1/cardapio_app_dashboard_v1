import { HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps } from "react-table";
import { Col, Table } from "reactstrap";
import { Tbody } from "../Tbody";
import { Thead } from "../Thead";

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
        <Thead
          headerGroups={headerGroups}
        />
        <Tbody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
        />
      </Table>
    </Col>
  );
}
