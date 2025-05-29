import axios from 'axios';
// permite que chamemos uma API(pagina http(s))
import React,{useState, useEffect} from 'react';
//effect mostra isso em tela
import estilos from './Visualizar.module.css'


export function DisciplinasProfessor(){
    // crio uma variavel disciplia que recebe os dados da API, e é controlada pelo state
    const {disciplinas, setDisciplina} = useState([]);

    //()parametros, {}script, []dependenciais, aqui mostro o que vou chamar
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/professor/disciplinas/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setDisciplina(response.data);
        })

        .catch(error => {
            console.error("Erro", error);
        });
        
    },[]);
    
  
  
    return(
        <div className={estilos.conteinerCard}>
            <h2 className={estilos.tituloCard}>Minhas Disciplinas</h2>
            <div className={estilos.listaCard}>
                {disciplinas.map(disciplina=>(
                    <div className={estilos.card} key={disciplina.id}>
                        <h3 className={estilos.nome}>{disciplina.nome}</h3>
                        <p><strong>Curso:</strong>{disciplina.curso}</p>
                        <p><strong>Descrição:</strong>{disciplina.descricao}</p>
                        <p><strong>Carga horário:</strong>{disciplina.cargaHoraria}</p>                        
                    </div>
 
                ))}
 
            </div>
        </div>
 
        )}