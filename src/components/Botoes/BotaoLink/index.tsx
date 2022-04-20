import { AnchorHTMLAttributes, ReactNode } from "react";
import { To, Link } from "react-router-dom";

interface BotaoLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  color: ButtonColors;
  to: To;
}

export function BotaoLink(props: BotaoLinkProps) {
  const { color, children, to } = props;

  return (
    <Link
      className={`btn btn-${color}`}
      {...props}
      to={to}
    >{children}</Link>
  );
}
