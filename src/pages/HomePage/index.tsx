import { MouseEventHandler, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { CellProps, Column, TableOptions, TableState, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from "reactstrap";
import styled from "styled-components";
import { BsFillGearFill } from "react-icons/bs";
import { Titulo } from "../../components/Titulo";
import { CampoFiltroGlobalTabela } from "../../components/Filtros";
import { ContainerApp } from "../../components/ContainerApp";
import { ExibePaginaInicioFim } from "../../components/Paginacao/ExibePaginaInicioFim";
import { IrParaPagina } from "../../components/Paginacao/IrParaPagina";
import { Paginacao } from "../../components/Paginacao/Paginacao";
import { QuantidadeItemsPorPagina } from "../../components/Paginacao/QuantidadeItemsPorPagina";
import { BotaoLink } from "../../components/Botoes/BotaoLink";
import { Tabela } from "../../components/Tabela/Tabela";
import { ModalConfirmacao, ModalConfirmacaoProps, ModalErroDadosNaoCarregados, ModalMensagem, ModalMensagemProps } from "../../components/Modals";
import { ApiBuscaDadosTodasRefeicoes, ApiRemoveRefeicao } from "../../utils/api";
import { FormatadorDados } from "../../utils/FormatadorDados";
import { To } from "react-router-dom";

export function HomePage() {
  const [data, setData] = useState<TabelaTypes[]>([]);

  useEffect(() => {
    let id = sessionStorage.getItem('id');
    let valida_id = (id) ? id : 'id';

    // api.get(`refeicao/cardapio/${valida_id}`)
    ApiBuscaDadosTodasRefeicoes(valida_id)
      .then((item) => {
        setData(item.data)
      })
      .catch((erro) => {
        ModalErroDadosNaoCarregados();
        console.error(erro);
      });
  }, []);

  const columns: readonly Column<TabelaTypes>[] = useMemo(() => [
    {
      Header: () => null,
      isVisible: false,
      id: 'refeicoes',
      hideHeader: false,
      columns: [
        {
          Header: 'Id',
          accessor: 'id',
          id: 'id'
        },
        {
          Header: 'Nome',
          accessor: 'nome',
          id: 'nome'
        },
        {
          Header: 'Tipo de produto',
          accessor: 'tipo_produto',
          id: 'tipo_produto'
        },
        {
          Header: 'Preço (R$)',
          accessor: 'preco',
          id: 'preco',
          Cell: (cell: PropsWithChildren<CellProps<never, any>>) => {
            let preco = cell.row.values['preco'];
            let valorFormatado = FormatadorDados.FormataValorMonetarioTexto(preco);
            return valorFormatado;
          }
        },
        {
          Header: 'Ativo',
          accessor: 'ativo',
          id: 'ativo',
          Cell: (cell: PropsWithChildren<CellProps<never, any>>) => {
            let status = cell.row.values['ativo'];
            let refeicaoStatus = FormatadorDados.ValidaStatusRefeicao(status);
            return refeicaoStatus;
          }
        },
        {
          Header: () => null,
          id: 'menu_item',
          Cell: (cell: PropsWithChildren<CellProps<never, any>>) => {
            const id_refeicao = cell.row.values['id'];

            return (
              <HomePageItemDropdown
                to={`/refeicao/${id_refeicao}`}
                onClick={() => {
                  const data_modal: ModalConfirmacaoProps = {
                    icone: "warning",
                    titulo: "Aviso",
                    mensagem: "Deseja excluir a refeição?"
                  };

                  ModalConfirmacao(data_modal)
                    .then(() => {
                      let id = cell.row.index;
                      data.splice(id, 1);
                      setData([...data]);
                      // api.delete(`refeicao/${id_refeicao}`)
                      ApiRemoveRefeicao(id_refeicao)
                        .then(() => {
                          const data_modal: ModalMensagemProps = {
                            icone: "success",
                            titulo: "Sucesso",
                            mensagem: "Refeição apagada com sucesso!"
                          };
                          
                          ModalMensagem(data_modal);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              />
            );
          }
        },
      ],
    },
  ], [data])

  const initialState: Partial<TableState<TabelaTypes>> = { pageIndex: 0 };

  const table_options: TableOptions<TabelaTypes> = { columns, data, initialState };
  
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
    state, setGlobalFilter, canPreviousPage, canNextPage, pageOptions,
    pageCount, gotoPage, nextPage, previousPage, setPageSize,
    state: { pageIndex, pageSize }, } = useTable(table_options, useGlobalFilter, useSortBy, usePagination);

  return (
    <ContainerApp>
      <Row>
        <Col md={12} className="mt-3 mb-3">
          <Titulo tag="h1">Lista de refeições</Titulo>
        </Col>
        <Col md={12}>
          <Row>
            <Col md={6} className="d-flex justify-content-start">
              <BotaoLink
                to="/refeicao/cadastro"
                color="primary"
              >Nova Refeição</BotaoLink>
            </Col>
            <Col md={6} className="d-flex justify-content-between align-items-center flex-row">
              <QuantidadeItemsPorPagina
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
              <CampoFiltroGlobalTabela
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Col>
          </Row>
        </Col>
        <Tabela
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
        />
        <Col md={12} className="d-flex justify-content-end align-items-center flex-row mb-5">
          <ExibePaginaInicioFim
            pageIndex={pageIndex}
            pageOptions={pageOptions}
          />
          <Paginacao
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageCount={pageCount}
          />
          <IrParaPagina
            pageIndex={pageIndex}
            gotoPage={gotoPage}
          />
        </Col>
      </Row>
    </ContainerApp>
  );
}

interface HomePageItemDropdownProps {
  to: To;
  onClick: MouseEventHandler<HTMLElement>
}

function HomePageItemDropdown(props: HomePageItemDropdownProps) {
  const { to, onClick } = props;
  return (
    <UncontrolledButtonDropdownEstilizado>
      <DropdownToggle caret className="caret-off d-flex justify-content-center align-items-center w-50 btn-success">
        <BsFillGearFill size={20} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <BotaoLink
            to={to}
            color="light"
            className="nav-link text-center"
          >Exibir</BotaoLink>
        </DropdownItem>
        <DropdownItem
          className="nav-link text-center"
          onClick={onClick}
        >Excluir</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdownEstilizado>
  );
}

const UncontrolledButtonDropdownEstilizado = styled(UncontrolledButtonDropdown)`
  .caret-off::before {
    display: none;
  }

  .caret-off::after {
      display: none;
  }
  
  width: 100%;
`;

/*
const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
  state, setGlobalFilter, canPreviousPage, canNextPage, pageOptions,
  pageCount, gotoPage, nextPage, previousPage, setPageSize,
  state: { pageIndex, pageSize }, } = useTable({
    columns: useMemo(() => [
      {
        Header: () => null,
        isVisible: false,
        id: 'refeicoes',
        hideHeader: false,
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
            id: 'id'
          },
          {
            Header: 'Nome',
            accessor: 'nome',
            id: 'nome'
          },
          {
            Header: 'Preço (R$)',
            accessor: 'preco',
            id: 'preco',
            Cell: (cell) => {
              let preco = cell.row.values['preco'];
              let valorFormatado = FormatadorDados.FormataValorMonetarioTexto(preco);
              return valorFormatado;
            }
          },
          {
            Header: 'Ativo',
            accessor: 'ativo',
            id: 'ativo',
            Cell: (cell) => {
              let status = cell.row.values['ativo'];
              let refeicaoStatus = FormatadorDados.ValidaStatusRefeicao(status);
              return refeicaoStatus;
            }
          },
          {
            Header: () => null,
            id: 'menu_item',
            Cell: (cell) => {
              const id_refeicao = cell.row.values['id'];

              return (
                <HomePageItemDropdown
                  to={`/refeicao/${id_refeicao}`}
                  onClick={() => {
                    const data_modal: ModalConfirmacaoProps = {
                      icone: "warning",
                      titulo: "Aviso",
                      mensagem: "Deseja excluir a refeição?"
                    };

                    ModalConfirmacao(data_modal)
                      .then(() => {
                        let id = cell.row.index;
                        data.splice(id, 1);
                        setData([...data]);
                        api.delete(`refeicao/${id_refeicao}`)
                          .then(() => {
                            // 
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                />
              );
            }
          },
        ],
      },
    ], [data]),
    data,
    initialState: {
      pageIndex: 0
    },
  }, useGlobalFilter, useSortBy, usePagination);
*/
