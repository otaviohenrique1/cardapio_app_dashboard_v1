import { ReactNode } from "react";
import { Alert, AlertProps } from "reactstrap";

interface AlertErroProps extends AlertProps {
  children: ReactNode;
}

export function AlertErro(props: AlertErroProps) {
  return (
    <Alert
      color="danger"
      {...props}
    >{props.children}</Alert>
  );
}
