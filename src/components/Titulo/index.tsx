import { HTMLAttributes, ReactNode } from "react";

type TituloTagTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TituloProps extends HTMLAttributes<HTMLHeadingElement> {
  tag: TituloTagTypes ;
  children: ReactNode;
}

export function Titulo(props: TituloProps) {
  const { tag, children } = props;
  const Tag = tag;
  
  return (
    <Tag {...props}>{children}</Tag>
  );
}