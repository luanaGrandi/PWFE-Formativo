import { Routes, Route } from "react-router-dom";
import { Login } from "../Paginas/Login";
import { Inicial } from "../Paginas/Inicial";
import { Menu } from '../Componentes/Menu';
import { Disciplinas } from '../Componentes/Disciplinas';
import { Ambiente } from "../Componentes/Ambiente";

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>

            <Route path='/inicial/' element={<Inicial/>}>
                <Route index element={<Menu/>}/>
            </Route>

            <Route path='/disciplinas/' element={<Inicial/>}>
                <Route index element={<Disciplinas/>}/>
            </Route>

            <Route path='/ambientes/' element={<Inicial/>}>
                <Route index element={<Ambiente/>}/>
            </Route>
        </Routes>
    )
}