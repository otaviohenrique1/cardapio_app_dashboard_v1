import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import { RootState } from "../../app/store";
import { adicionaLogin } from "../../features/login/LoginSlice";
import { dadosIniciaisUsuarioLogado, HeaderApp, UsuarioLogadoDataTypes } from "../HeaderApp";

interface ContainerAppProps {
  children: ReactNode;
}

export function ContainerApp(props: ContainerAppProps) {
  const [data, setData] = useState<UsuarioLogadoDataTypes>(dadosIniciaisUsuarioLogado);

  const selector = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if(selector.login.id &&
      selector.login.nome) {
      setData({
        id: selector.login.id,
        nome: selector.login.nome,
      });
    } else {
      let id = sessionStorage.getItem('id');
      let nome = sessionStorage.getItem('nome');
  
      if (id && nome) {
        dispatch(adicionaLogin({
          id: id,
          nome: nome,
        }));
        
        setData({
          id: selector.login.id,
          nome: selector.login.nome,
        });
      }
    }
    
  }, [dispatch, selector.login.id, selector.login.nome]);

  return (
    <>
      <HeaderApp data_usuario_logado={data} />
      <Container className="mt-2">{props.children}</Container>
    </>
  );
}