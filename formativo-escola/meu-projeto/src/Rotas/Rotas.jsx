import { Routes, Route } from "react-router-dom";
import { Login } from "../Paginas/Login";
import { Inicial } from "../Paginas/Inicial";
import { Menu } from '../Componentes/Menu';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor'
import { Disciplina } from "../Paginas/Disciplina";
import { DisciplinaEditar } from '../Paginas/DisciplinaEditar';
import { DisciplinaCadastrar } from "../Paginas/DisciplinaCadastrar";
import { Professores } from "../Paginas/Professores";
import { ProfessoresEditar } from "../Paginas/Professoreseditar";
import { ProfessoresCadastrar } from "../Paginas/ProfessoresCadastrar";




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
          <Route path="disCad" element={<DisciplinaCadastrar />} />
        </Route>

        <Route path='professores'>
          <Route index element ={<Professores/>} />
          <Route path="editar/:id" element={<ProfessoresEditar />} />
          <Route path="profCadastrar" element={<ProfessoresCadastrar />} />
        </Route> 
          
        
      </Route>
    </Routes>
  );
}