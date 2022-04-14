interface ExibePaginaInicioFimProps {
  pageIndex: number;
  pageOptions: number[];
}

export function ExibePaginaInicioFim(props: ExibePaginaInicioFimProps) {
  const pagina_inicial = props.pageIndex + 1;
  const total_paginas = props.pageOptions.length;
  return (
    <p className="me-3 mb-0">Pagina {pagina_inicial} de {total_paginas}</p>
  );
}