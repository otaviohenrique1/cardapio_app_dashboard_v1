import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Form as FormReactstrap, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table, UncontrolledButtonDropdown } from "reactstrap";
import { Titulo } from "../../components/Titulo";
import { FormataValorMonetarioTexto } from "../../utils/utils";
import { BsFillGearFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CampoFiltroGlobalTabela } from "../../components/Filtros";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { ContainerApp } from "../../components/ContainerApp";
import { lista_teste_refeicoes } from "../../utils/listas";

const SwalModal = withReactContent(Swal);

interface FormTypes {
  id: number;
  nome: string;
  preco: string;
  ativo: string;
}

export function HomePage() {
  const [data, setData] = useState<FormTypes[]>([]);

  useEffect(() => {
    let listaData = lista_teste_refeicoes.map((item) => {
      return {
        id: item.id,
        nome: item.nome,
        preco: `R$ ${FormataValorMonetarioTexto(item.preco)}`,
        ativo: item.ativo,
      }
    });
    setData(listaData);
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
    state, setGlobalFilter, canPreviousPage, canNextPage, pageOptions,
    pageCount, gotoPage, nextPage, previousPage, setPageSize,
    state: { pageIndex, pageSize }, } = useTable({
      columns: useMemo(() => [{
        Header: () => null,
        isVisible: false,
        id: 'refeicoes',
        hideHeader: false,
        columns: [
          { Header: 'Nome', accessor: 'nome', id: 'nome' },
          { Header: 'Preço', accessor: 'preco', id: 'preco' },
          { Header: 'Ativo', accessor: 'ativo', id: 'ativo' },
          {
            Header: () => null,
            id: 'menu_item',
            Cell: (cell) => {
              return (
                <UncontrolledButtonDropdownEstilizado>
                  <DropdownToggle caret className="caret-off d-flex justify-content-center align-items-center w-50 btn-success">
                    <BsFillGearFill size={20} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to={`/refeicao/${1}`} className="nav-link">Exibir</Link>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        SwalModal.fire({
                          title: <h3>Excluir</h3>,
                          buttonsStyling: false,
                          confirmButtonText: 'Sim',
                          showCancelButton: true,
                          cancelButtonText: 'Não',
                          customClass: {
                            confirmButton: 'btn btn-primary me-1',
                            cancelButton: 'btn btn-danger',
                          },
                        }).then(() => {
                          let id = cell.row.index;
                          data.splice(id, 1);
                          setData([...data]);
                        });
                      }}
                    >Excluir</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdownEstilizado>
              );
            }
          },
        ],
      },], [data])
      , data, initialState: { pageIndex: 0 },
    }, useGlobalFilter, useSortBy, usePagination);

  return (
    <ContainerApp>
      <Row>
        <Col md={12} className="mt-3 mb-3">
          <Titulo tag="h1">HomePage</Titulo>
        </Col>
        <Col md={12}>
          <Row>
            <Col md={6} className="d-flex justify-content-start">
              <Link to="/refeicao/cadastro" className="btn btn-primary">Nova Refeição</Link>
            </Col>
            {(page.length === 0) ? (null) : (
              <Col md={6} className="d-flex justify-content-between align-items-center flex-row">
                <FormReactstrap className="d-flex flex-row align-items-center"
                  onSubmit={event => event.preventDefault()}>
                  <Label for="page_select" className="mb-0 me-3 fw-bold form-label">Exibir</Label>
                  <select
                    value={pageSize}
                    onChange={event => {
                      setPageSize(Number(event.target.value))
                    }}>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option value={pageSize} key={pageSize}>{pageSize}</option>
                    ))}
                  </select>
                </FormReactstrap>
                <CampoFiltroGlobalTabela
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </Col>
            )}
          </Row>
        </Col>
        <Col md={12}>
          <Table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <FaSortDown />
                            : <FaSortUp />
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {(page.length === 0) ? (
                <tr className="bg-light">
                  <td colSpan={7} className="text-center h1 p-5">Lista Vazia</td>
                </tr>
              ) : (
                page.slice(0, 20).map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="bg-light">
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })
              )}
            </tbody>
          </Table>
        </Col>
        {(page.length === 0) ? (null) : (
          <Col md={12} className="d-flex justify-content-end align-items-center flex-row mb-5">
            <p className="me-3 mb-0">
              Pagina {pageIndex + 1} de {pageOptions.length}
            </p>
            <PaginationEstilizado>
              <PaginationItem>
                <PaginationLink
                  first
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  previous
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  next
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  last
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                />
              </PaginationItem>
            </PaginationEstilizado>
            <div className="d-flex justify-content-end align-items-center flex-row ms-3">
              <p className="w-100 mb-0 me-2 text-end">Ir para a pagina</p>
              <Input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={event => {
                  const pagina = event.target.value ? Number(event.target.value) - 1 : 0
                  gotoPage(pagina)
                }}
              />
            </div>
          </Col>
        )}
      </Row>
    </ContainerApp>
  );
}

const PaginationEstilizado = styled(Pagination)`
  ul.pagination {
    margin-bottom: 0 !important;
  }
`;


const UncontrolledButtonDropdownEstilizado = styled(UncontrolledButtonDropdown)`
  .caret-off::before {
    display: none;
  }

  .caret-off::after {
      display: none;
  }
  
  width: 100%;
`;
