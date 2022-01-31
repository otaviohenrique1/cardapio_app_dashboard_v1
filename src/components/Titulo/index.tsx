import { HTMLAttributes, ReactNode } from "react";

interface TituloProps extends HTMLAttributes<HTMLHeadingElement> {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" ;
  children: ReactNode;
}

export function Titulo(props: TituloProps) {
  const Tag = props.tag;
  
  return (
    <Tag {...props}>{props.children}</Tag>
  );
}