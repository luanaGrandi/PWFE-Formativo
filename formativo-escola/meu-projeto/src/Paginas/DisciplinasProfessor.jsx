import axios from 'axios'; // permime chamar uma API
import React, {useState, useEffect} from 'react';
//effect mostra isso em tela
import estilo from './Visualizar.module.css'

// nesta função, os professores conseguem ver suas disciplinas cadastradas
export function DisciplinasProfessor(){
    //crio uma variável disciplina que recebe os dados da api, e é controlada pelo state
    const [disciplinas, setDisciplina] = useState([]);
    
    //()parametros, {}script, []dependencias, aqui mostro o que vou chamar 
    useEffect(()=>{
        //pegar o token de acesso
        const token = localStorage.getItem('access_token');

        //Chama o endereço da api que eu quero consumir
        axios.get('http://127.0.0.1:8000/api/professor/disciplinas/', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        // se der certo, recebe e atualiza os dados
        .then(response =>{
            setDisciplina(response.data);
        })
        // se der errado imprimi o erro
        .catch(error =>{
            console.error("Erro", error);
        });
    },[]);
    
    return(
        // monta a estrutura e o visual para o professor visualizar suas disciplinas
        <div className={estilo.containerCard}>
            <h2 className={estilo.tituloCard}>Minhas Disciplinas</h2>

            <div className={estilo.listaCard}>
                {disciplinas.map(disciplina=>(
                    <div className={estilo.card} key={disciplina.id}>
                        <h3 className={estilo.nome}>{disciplina.nome}</h3>
                        <p><strong>Curso:</strong>{disciplina.curso}</p>
                        <p><strong>Descrição:</strong>{disciplina.descricao}</p>
                        <p><strong>Carga Horária:</strong>{disciplina.carga_horaria}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}