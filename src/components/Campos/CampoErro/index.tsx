import { AlertErro } from "../../AlertErro";

export interface CampoErroProps {
  error?: any;
  touched?: any;
}

export function CampoErro(props: CampoErroProps) {
  const { error, touched } = props;
  return (
    <>{error && touched ? <AlertErro>{error}</AlertErro> : null}</>
  );
}
