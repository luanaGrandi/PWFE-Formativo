import estilos from './Menu.module.css';
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplina.png';
import gestor from '../assets/gestor.png';
import professor from '../assets/professor.png';

export function Menu(){
    return(
        <div className={estilos.container}>
            <table>
                <tbody>
                    <tr>
                        
                        <td>
                            <img src={disciplina} alt="icone de chapeu" />
                            <label alt='disciplinas do professor'>Disciplinas</label>
                        </td>

                        <td>
                        <img src={ambiente} alt="icone de localização" />
                            <label alt='ambientes do professor'>Ambiente</label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                        <img src={professor} alt="icone de pessoa que representa professor" />
                            <label alt="Prfessores">Professores</label>
                        </td>
                        <td>
                            <img src={gestor} alt="icone de grupp, que representa o gestor" />
                            <label alt="Gestores">Gestores</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}