import { Outlet } from 'react-router-dom';
import estilos from './Conteudo.module.css'
import { Menu } from './Menu';


export function Conteudo (){
    return(
        <main className={estilos.container}>
            {/* mostra o menu da pagina */}
           <Menu/>
        </main>
    )
}