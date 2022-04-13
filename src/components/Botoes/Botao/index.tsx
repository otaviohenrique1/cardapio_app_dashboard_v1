import { ReactNode } from "react";
import { ButtonProps, Button } from "reactstrap";

interface BotaoProps extends ButtonProps {
  children: ReactNode;
  color: ButtonColors;
}

export function Botao(props: BotaoProps) {
  return (
    <Button
      {...props}
      color={props.color}
    >{props.children}</Button>
  );
}