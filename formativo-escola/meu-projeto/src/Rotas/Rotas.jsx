import { Routes, Route } from "react-router-dom";
import { Login } from "../Paginas/Login";
import { Inicial } from "../Paginas/Inicial";
import { Menu } from '../Componentes/Menu';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor'
import { Disciplina } from "../Paginas/Disciplina";
import { DisciplinaEditar } from '../Paginas/DisciplinaEditar';




export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicial" element={<Inicial />}>
        <Route index element={<Menu />} />
        <Route path="disciplinaprof" element={<DisciplinasProfessor />} />
        <Route path="disciplina">
          <Route index element={<Disciplina />} />
          <Route path="editar/:id" element={<DisciplinaEditar />} />
        <Route path="disCad" element={<DisciplinaEditar />} />
    </Route>
      </Route>
    </Routes>
  );
}