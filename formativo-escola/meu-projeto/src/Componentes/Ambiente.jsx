import estilos from './Ambiente.module.css';
import seta from '../assets/setaVoltar.svg';
import mais from '../assets/mais.svg'
import { useNavigate } from "react-router-dom";

export function Ambiente(){
    const navigate = useNavigate();

    return(
        <main className={estilos.ambiente}>
            <div className={estilos.voltar} onClick={() => navigate('/inicial')}>
                <p> 
                    <img  src={seta} alt="seta de voltar" />
                    Voltar
                </p>
            </div>
            
            <div className={estilos.titulos}>
                <h1>Listagem de Ambientes</h1>

                <p className={estilos.linkCadastrar}> 
                    <img src={mais} alt="Simbulo de mais" />
                    Cadastrar
                </p>
            </div>
        </main>
    )
}