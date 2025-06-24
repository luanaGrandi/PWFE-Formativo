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
import { Reserva } from "../Paginas/Reserva";
import { ReservaCadastrar } from "../Paginas/ReservaCadastrar";
import { Salas } from "../Paginas/Salas";
import { SalasCadastrar } from "../Paginas/SalasCadastrar";
import { ReservaEditar } from "../Paginas/ReservaEditar";
import { Gestores } from "../Paginas/Gestores";
import { GestorCadastrar } from "../Paginas/Gestorcadastrar";
import { GestorEditar } from "../Paginas/GestorEditar";
import { SalaEditar } from "../Paginas/SalaEditar";
import { ReservaProfessores } from "../Paginas/ReservaProfessores";

export function Rotas() {
  return (
    <Routes>
      {/* rota para página de login */}
      <Route path="/" element={<Login />} />
      {/* rota para a pagina inicial */}
      <Route path="/inicial" element={<Inicial />}>
        <Route index element={<Menu />} />
        {/* rota para a pagina de disciplina do professor */}
        <Route path="disciplinaprof" element={<DisciplinasProfessor />} />
        {/* rota para a pagina de rervas do professor */}
        <Route path="ReservaProf" element={<ReservaProfessores />} />

        {/* rota para as paginas de disciplinas */}
        <Route path="disciplina">
          <Route index element={<Disciplina />} />
          <Route path="editar/:id" element={<DisciplinaEditar />} />
          <Route path="disCad" element={<DisciplinaCadastrar />} />
        </Route>

        {/* rotas para as paginas de professores */}
        <Route path='professores'>
          <Route index element ={<Professores/>} />
          <Route path="editar/:id" element={<ProfessoresEditar />} />
          <Route path="profCadastrar" element={<ProfessoresCadastrar />} />
        </Route> 

        {/* rotas para as paginas de reservas */}
        <Route path='reservas'>
          <Route index element= {<Reserva/>}/>
          <Route path="reservaCad" element={<ReservaCadastrar />} />
          <Route path="editar/:id" element={< ReservaEditar />} />
          
        </Route>
        
        {/* rotas para as paginas de salas */}
        <Route path='salas'>
          <Route index element={<Salas />}/>
          <Route path="salaCad" element={<SalasCadastrar />}/>
          <Route path="editar/:id" element={<SalaEditar />} />
        </Route>

        {/* rota para as paginas de gestores */}
        <Route path='gestores'>
          <Route index element={< Gestores/>} />
          <Route path="editar/:id" element={< GestorEditar />} />
          <Route path="GestorCadastrar" element={<GestorCadastrar />}/>
          
        </Route>
        
      </Route>
    </Routes>
  );
}