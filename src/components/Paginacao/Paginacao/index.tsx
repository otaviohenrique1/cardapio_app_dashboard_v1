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
  const pagina_anterior = props.canPreviousPage;
  const proxima_pagina = props.canNextPage;
  const pagina_numero = props.pageCount;

  return (
    <PaginationEstilizado>
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => props.gotoPage(0)}
          disabled={!pagina_anterior}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => props.previousPage()}
          disabled={!pagina_anterior}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          next
          onClick={() => props.nextPage()}
          disabled={!proxima_pagina}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() => props.gotoPage(pagina_numero - 1)}
          disabled={!proxima_pagina}
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
