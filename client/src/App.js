import React from "react";
import PaginaHome from "./pages/PaginaHome";
import PaginaLogin from "./pages/PaginaLogin";
import PaginaCadastro from "./pages/PaginaCadastro";
import PaginaChat from "./pages/PaginaChat"
import PaginaTeste from "./pages/PaginaTeste";
import "./style/App.css";
import "./style/login.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { UserContextProvider } from './UserContext';
import PaginaComunidade from "./pages/PaginaComunidade";
import PaginaCriar from "./components/comunidade/PaginaCriar";
import PaginaEditar from "./components/comunidade/PaginaEditar";


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PaginaHome />} />
          <Route path={'/entrar'} element={<PaginaLogin />} />
          <Route path={'/cadastro'} element={<PaginaCadastro />} />
          <Route path={'/teste/:id'} element={<PaginaTeste/>}/>
          <Route path={'/chat'} element={<PaginaChat/>}/>
          {/* Assuntos da comunidade agora */}
          <Route path={'/comunidade'} element={<PaginaComunidade/>}/>
          <Route path={'/comunidade/criar'} element={<PaginaCriar/>}/>
          <Route path={'/comunidade/editar'} element={<PaginaEditar/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
