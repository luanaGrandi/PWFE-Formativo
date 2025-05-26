import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router-dom";
import { Footer } from "../Componentes/Footer";


export function Inicial(){
    return(
        <>
            <Cabecalho/>
            <Outlet/>
            <Footer/>
        </>
    )
}
