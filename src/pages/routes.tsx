import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Login } from "./Login";
import { Pagina404 } from "./Pagina404";
import { RefeicaoCadastro } from "./Refeicao/RefeicaoCadastro";
import { RefeicaoDados } from "./Refeicao/RefeicaoDados";
import { UsuarioCadastro } from "./Usuario/UsuarioCadastro";
import { UsuarioDados } from "./Usuario/UsuarioDados";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/usuario/cadastro" element={<UsuarioCadastro/>} />
        <Route path="/usuario/:id" element={<UsuarioDados/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/refeicao/cadastro" element={<RefeicaoCadastro/>} />
        <Route path="/refeicao/:id" element={<RefeicaoDados/>} />
        <Route element={<Pagina404 />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}