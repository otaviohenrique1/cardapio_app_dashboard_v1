import { ReactNode } from "react";
import { Container } from "reactstrap";
import { HeaderApp, UsuarioLogadoDataTypes } from "../HeaderApp";

interface ContainerAppProps {
  children: ReactNode;
  data_usuario_logado?: UsuarioLogadoDataTypes;
}

export function ContainerApp(props: ContainerAppProps) {
  return (
    <>
      <HeaderApp data_usuario_logado={props.data_usuario_logado}/>
      <Container className="mt-2">{props.children}</Container>
    </>
  );
}