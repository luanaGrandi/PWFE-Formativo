import estilos from './BarraNavegacao.module.css'

export function BarraNavegacao(){
    return(
        <nav className={estilos.container}>
            <ul>
                <li>Objetivo</li>
                <li>Conquistas</li>
                <li>Sobre Nós</li>
            </ul>
        </nav>
    )
}