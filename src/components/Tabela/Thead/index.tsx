import { HeaderGroup } from "react-table";
import { TheadTr } from "../TheadTr";

interface TabelaTheadProps {
  headerGroups: HeaderGroup<TabelaTypes>[];
}
export function Thead(props: TabelaTheadProps) {
  const { headerGroups } = props;

  return (
    <thead>
      {headerGroups.map((headerGroup, index) => {
        const { getHeaderGroupProps, headers } = headerGroup;

        return (
          <TheadTr
            getHeaderGroupProps={getHeaderGroupProps}
            headers={headers}
            key={index}
          />
        );
      })}
    </thead>
  );
}
