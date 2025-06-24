import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router-dom";
import { Footer } from "../Componentes/Footer";

// Este componente é usado como um layout padrão para a aplicação,
// Ele exibe o cabeçalho fixo no topo, o conteúdo da rota atual no meio (Outlet) 
// e o rodapé fixo embaixo.
export function Inicial(){
    return(
        <>
            <Cabecalho/>
            <Outlet/>
            <Footer/>
        </>
    )
}
