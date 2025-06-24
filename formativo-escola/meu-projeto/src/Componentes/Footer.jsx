import estilos from './Footer.module.css';

export function Footer(){
    return(
        // footer basico
        <footer className={estilos.container}>
            <p className={estilos.creditos}>Prof conect @2025</p>
        </footer>
    )
}