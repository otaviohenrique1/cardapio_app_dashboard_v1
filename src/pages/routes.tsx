// import { ReactNode, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Calendario } from "./Calenario";
import { HomePage } from "./HomePage";
import { Login } from "./Login";
import { Pagina404 } from "./Pagina404";
import { RefeicaoCadastro } from "./Refeicao/RefeicaoCadastro";
import { RefeicaoDados } from "./Refeicao/RefeicaoDados";
import { RefeicaoEdicao } from "./Refeicao/RefeicaoEdicao";
import { TesteUuid } from "./TesteUuid";
import { UsuarioCadastro } from "./Usuario/UsuarioCadastro";
import { UsuarioDados } from "./Usuario/UsuarioDados";
import { UsuarioEdicao } from "./Usuario/UsuarioEdicao";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/usuario/cadastro" element={<UsuarioCadastro/>} />
        <Route path="/usuario/:id" element={<UsuarioDados/>} />
        <Route path="/usuario/:id/edicao" element={<UsuarioEdicao />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/refeicao/cadastro" element={<RefeicaoCadastro/>} />
        <Route path="/refeicao/:id" element={<RefeicaoDados />} />
        <Route path="/refeicao/:id/edicao" element={<RefeicaoEdicao />} />
        <Route element={<Pagina404 />} path="*" />
        <Route path="/calendario" element={<Calendario/>} /> {/* Pagina de teste, Retirar */}
        <Route path="/testeuuid" element={<TesteUuid/>} /> {/* Pagina de teste, Retirar */}
      </Routes>
    </BrowserRouter>
  );
}

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider(props: AuthProviderProps) {
//   let [user, setUser] = useState<any>(null);

//   return (
//     <div></div>
//   );
// }