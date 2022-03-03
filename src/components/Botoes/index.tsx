import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, To } from "react-router-dom";
import { Button, ButtonProps } from "reactstrap";

type ButtonColors = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";

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

interface BotaoLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  color: ButtonColors;
  to: To;
}

export function BotaoLink(props: BotaoLinkProps) {
  return (
    <Link
      className={`btn btn-${props.color}`}
      {...props}
      to={props.to}
    >{props.children}</Link>
  );
}

