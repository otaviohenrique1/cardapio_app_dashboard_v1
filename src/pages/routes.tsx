// import { ReactNode, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Login } from "./Login";
import { Pagina404 } from "./Pagina404";
import { RefeicaoCadastro } from "./Refeicao/RefeicaoCadastro";
import { RefeicaoDados } from "./Refeicao/RefeicaoDados";
import { RefeicaoEdicao } from "./Refeicao/RefeicaoEdicao";
import { EmpresaDados } from "./Empresa/EmpresaDados";
import { EmpresaEdicao } from "./Empresa/EmpresaEdicao";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        {/* <Route path="/usuario/cadastro" element={<UsuarioCadastro/>} /> */}
        <Route path="/usuario/:id" element={<EmpresaDados/>} />
        <Route path="/usuario/:id/edicao" element={<EmpresaEdicao />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/refeicao/cadastro" element={<RefeicaoCadastro/>} />
        <Route path="/refeicao/:id" element={<RefeicaoDados />} />
        <Route path="/refeicao/:id/edicao" element={<RefeicaoEdicao />} />
        <Route path="*" element={<Pagina404 />} />
      </Routes>
    </BrowserRouter>
  );
}
