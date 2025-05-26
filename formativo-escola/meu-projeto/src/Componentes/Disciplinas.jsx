import estilos from './Disciplinas.module.css';
import seta from '../assets/setaVoltar.svg';
import mais from '../assets/mais.svg'
import { useNavigate } from "react-router-dom";

export function Disciplinas(){
    const navigate = useNavigate();

    return(
        <main className={estilos.Disciplinas}>
            <div className={estilos.voltar} onClick={() => navigate('/inicial')}>
                <p> 
                    <img  src={seta} alt="seta de voltar" />
                    Voltar
                </p>
            </div>
            
            <div className={estilos.titulos}>
                <h1>Listagem de Disciplinas</h1>

                <p className={estilos.linkCadastrar}> 
                    <img src={mais} alt="Simbulo de mais"/>
                    Cadastrar
                </p>
            </div>
        </main>
    )
}