import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styled from "styled-components";

interface PaginacaoProps {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
}

export function Paginacao(props: PaginacaoProps) {
  return (
    <PaginationEstilizado>
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => props.gotoPage(0)}
          disabled={!props.canPreviousPage}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => props.previousPage()}
          disabled={!props.canPreviousPage}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          next
          onClick={() => props.nextPage()}
          disabled={!props.canNextPage}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() => props.gotoPage(props.pageCount - 1)}
          disabled={!props.canNextPage}
        />
      </PaginationItem>
    </PaginationEstilizado>
  );
}

const PaginationEstilizado = styled(Pagination)`
  ul.pagination {
    margin-bottom: 0 !important;
  }
`;
