import { ReactNode } from "react";
import { ButtonProps, Button } from "reactstrap";

interface BotaoProps extends ButtonProps {
  children: ReactNode;
  color: ButtonColors;
}

export function Botao(props: BotaoProps) {
  const { color, children } = props;
  
  return (
    <Button
      {...props}
      color={color}
    >{children}</Button>
  );
}