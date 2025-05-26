import estilos from './Footer.module.css';

export function Footer(){
    return(
        <footer className={estilos.container}>
            <p class={estilos.creditos}>Prof conect @2025</p>
        </footer>
    )
}