import estilos from './Menu.module.css';
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplina.png';
import gestor from '../assets/gestor.png';
import professor from '../assets/professor.png';
import logo from '../assets/logoProf.png'
import { Link } from "react-router-dom";

export function Menu(){
     // Pega o tipo do usuário armazenado no back
    const tipo = localStorage.getItem('tipo');

    // Define as rotas dos links dependendo do tipo de usuário
    // Se for professor, usa rotas específicas para professor; se não, rotas gerais
    const linkDisciplina = tipo ==='P' ?  'DisciplinaProf' : 'disciplina'
    const linkReserva = tipo ==='P' ?  'ReservaProf' : 'reservas'
    

    return(
        
      <main>
        {/* os cards com seus respectivos icones e funções de link */}
        <h1 className={estilos.titulo}>OPÇÕES</h1>
            <div className={estilos.menu}>
                <div className={estilos.card}>
                    <Link to= {linkDisciplina}>
                    <img className={estilos.icone} src={disciplina} alt="icone de chapeu" />
                    <label className={estilos.descricao} alt='disciplinas do professor'>Disciplinas</label>
                    </Link>
                </div>
                <div className={estilos.card}>
                    <Link to= {linkReserva}>
                        <img className={estilos.icone} src={ambiente} alt="icone de localização" />
                        <label className={estilos.descricao} alt='ambientes do professor'>Reserva</label>
                    </Link>
                </div>
                {/* se o usuario for gestor, mastrar os demais links */}
                {tipo === 'G'&&(
                    <>
                    
                    <div className={estilos.card}>
                    <Link to= 'salas'>
                        <img className={estilos.icone} src={ambiente} alt="icone de localização" />
                        <label className={estilos.descricao} alt='ambientes do professor'>Salas</label>
                    </Link>
                    </div>
                    <div className={estilos.card}>
                        <Link to='professores'>
                            <img className={estilos.icone} src={professor} alt="icone de pessoa que representa professor" />
                            <label className={estilos.descricao} alt="Prfessores">Professores</label>
                        </Link>
                    </div>
                    <div className={estilos.card}>
                        <Link to = 'gestores'>
                            <img className={estilos.icone} src={gestor} alt="icone de grupp, que representa o gestor" />
                            <label className={estilos.descricao} alt="Gestores">Gestores</label>
                        </Link>
                        
                    </div>
                    </>
                )}
                
            </div>
            {/* a parte de conteudo da minha pagina, a historia do gerenciador */}
            <section className={estilos.nossaHistoria}>
                <h1 className={estilos.subtitulo}>Nossa Historia</h1>
                <div className={estilos.info}>
                    <img className={estilos.imgLogo} src={logo} alt="Logo Prof Conecta" />
                    <p className={estilos.descricoes}>A Prof Conecta é uma solução digital inovadora desenvolvida para simplificar a gestão escolar. Com ela, escolas podem cadastrar e organizar facilmente professores, disciplinas e salas de aula, oferecendo uma experiência eficiente e intuitiva tanto para administradores quanto para educadores. Nossa plataforma visa otimizar o processo de gestão educacional, promovendo uma administração mais ágil e uma comunicação mais eficaz no ambiente escolar</p>
                </div>
            </section>
            
        </main>  
      
    )
}






// <table>
// <tbody>
//     <tr>
//         <td >
//             <img className={estilos.icone} src={disciplina} alt="icone de chapeu" />
//             <label className={estilos.descricao} alt='disciplinas do professor'>Disciplinas</label>
//         </td>

//         <td >
//         <img className={estilos.icone} src={ambiente} alt="icone de localização" />
//             <label className={estilos.descricao} alt='ambientes do professor'>Ambiente</label>
//         </td>
//     </tr>

//     <tr>
//         <td >
//         <img className={estilos.icone} src={professor} alt="icone de pessoa que representa professor" />
//             <label className={estilos.descricao} alt="Prfessores">Professores</label>
//         </td>
//         <td>
//             <img className={estilos.icone} src={gestor} alt="icone de grupp, que representa o gestor" />
//             <label className={estilos.descricao} alt="Gestores">Gestores</label>
//         </td>
//     </tr>
// </tbody>
// </table>
// </div>
// )
