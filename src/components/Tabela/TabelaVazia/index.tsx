interface TabelaVaziaProps {
  colSpan: number;
}

export function TabelaVazia(props: TabelaVaziaProps) {
  const { colSpan } = props;

  return (
    <tr className="bg-light">
      <td colSpan={colSpan} className="text-center h1 p-5">Tabela Vazia</td>
    </tr>
  );
}
