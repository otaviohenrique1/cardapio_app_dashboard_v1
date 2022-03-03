interface ExibePaginaInicioFimProps {
  pageIndex: number;
  pageOptions: number[];
}

export function ExibePaginaInicioFim(props: ExibePaginaInicioFimProps) {
  return (
    <p className="me-3 mb-0">Pagina {props.pageIndex + 1} de {props.pageOptions.length}</p>
  );
}