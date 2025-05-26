import estilos from './Cabecalho.module.css'
import logo from '../assets/logoProf.png'
import login from '../assets/login.png'

export function Cabecalho(){
    return(
        <header className={estilos.container}>
            <img className={estilos.imgLogo} src={logo} alt="Logo Prof Conecta" />
        </header>
    )
}